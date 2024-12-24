import type { FormInst } from 'naive-ui'
import type { BaseForm, FormOptions, InternalPath } from 'pro-composables'
import type { Merge, Paths, Simplify, SimplifyDeep } from 'type-fest'
import type { ComputedRef, DeepReadonly, Ref, UnwrapNestedRefs } from 'vue'
import type { FieldExtraInfo } from '../components/field/field-extra-info'
import type { FormItemInternalValidationResult } from './useValidationResult'
import { isString } from 'lodash-es'
import { createForm, stringifyPath } from 'pro-composables'
import { computed, inject, nextTick, provide, readonly, ref } from 'vue'
import { createInjectionKey } from '../../composables/createInjectionKey'
import { fieldExtraKey } from '../components/field/field-extra-info'
import { useValidationResults } from './useValidationResult'

export interface ValidateError {
  field?: string
  fieldValue?: any
  message?: string
}

export const proFormInternalKey = '__proFormInternalKey__'

type StringKeyof<Values = any> = Exclude<Paths<Values>, symbol | number>

export type CreateProFormReturn<Values = any> = Simplify<Pick<
  BaseForm<Values>,
  | 'matchPath'
  | 'getFieldValue'
  | 'getFieldsValue'
  | 'setFieldValue'
  | 'setFieldsValue'
  | 'resetFieldValue'
  | 'resetFieldsValue'
  | 'setInitialValue'
  | 'setInitialValues'
  | 'pauseDependenciesTrigger'
  | 'resumeDependenciesTrigger'
  | 'getFieldsTransformedValue'
> & {
  /**
   * 提交表单
   */
  submit: () => void
  /**
   * 还原所有字段值并清空校验
   */
  restoreFieldsValue: () => void
  /**
   * 还原指定字段值并清空校验
   */
  restoreFieldValue: <T extends InternalPath = StringKeyof<Values>>(path: T) => void
  /**
   * 清空校验
   */
  restoreValidation: <T extends InternalPath = StringKeyof<Values>>(paths?: T) => void
  /**
   * 校验
   */
  validate: <T extends InternalPath = StringKeyof<Values>>(paths?: T) => ReturnType<FormInst['validate']> | undefined
  /**
   * 获取字段值的校验结果
   * @param path 路径
   */
  getFieldValidationResult: (path: InternalPath) => FormItemInternalValidationResult | null
  /**
   * 所有的值（包含用户设置的和可能被隐藏的字段）
   * ⚠️注意：它是只读的，表单值修改你应该通过 setFieldValue/setFieldsValue api
   */
  values: DeepReadonly<UnwrapNestedRefs<Ref<Values>>>
  /**
   * 是否正在提交，需要提供 onSubmit 函数才会生效
   */
  submiting: ComputedRef<boolean>
  /**
   * 内部使用
   */
  [proFormInternalKey]: {
    internalForm: BaseForm
    model: Ref<Record<string, any>>
    registerNFormInst: (nForm: FormInst) => void
    validationResults: ReturnType<typeof useValidationResults>
  }
}>

export interface CreateProFormOptions<Values = any> extends FormOptions<Values> {
  /**
   * 数据重置后的回调事件
   */
  onReset?: () => void
  /**
   * 数据验证成功后的回调事件,如果是一个 Promise, submiting 将等待这个 Promise 完成
   */
  onSubmit?: (values: SimplifyDeep<Values>, warnings: ValidateError[][]) => void | Promise<void>
  /**
   * 数据验证失败后回调事件
   */
  onSubmitFailed?: (errors: ValidateError[][]) => void
  /**
   * 依赖项的值发生变化后是否进行校验
   * @default true
   */
  validateOnDependenciesValueChange?: boolean
}

export function createProForm<Values = any>(options: Simplify<CreateProFormOptions<Values>> = {}): CreateProFormReturn<Values> {
  const {
    omitNil,
    onReset,
    onSubmit,
    initialValues,
    onValueChange,
    onSubmitFailed,
    validateOnDependenciesValueChange = true,
  } = options

  const internalForm = createForm({
    omitNil,
    initialValues,
    onValueChange,
    onDependenciesValueChange,
  })

  const {
    matchPath,
    fieldStore,
    valueStore,
    getFieldValue,
    setFieldValue,
    getFieldsValue,
    setFieldsValue,
    setInitialValue,
    resetFieldValue,
    resetFieldsValue,
    setInitialValues,
    pauseDependenciesTrigger,
    resumeDependenciesTrigger,
    getFieldsTransformedValue,
  } = internalForm

  const submiting = ref(false)
  const nFormInst = ref<FormInst>()
  const validationResults = useValidationResults()

  const {
    addValidationErrors,
    addValidationWarnings,
    clearValidationResults,
    getFieldValidationResult,
  } = validationResults

  function registerNFormInst(nForm: FormInst) {
    nFormInst.value = nForm
  }

  function onDependenciesValueChange(opt: {
    value: any
    path: string
    depPath: string
  }) {
    const {
      path,
      value,
      depPath,
    } = opt
    if (validateOnDependenciesValueChange) {
      validate(depPath)
    }
    if (options.onDependenciesValueChange) {
      options.onDependenciesValueChange({
        path,
        value,
        depPath,
      })
    }
  }

  function validate(paths?: InternalPath) {
    if (!paths) {
      return nFormInst.value?.validate(addValidateResults, (rule) => {
        return !(rule as any).readonly
      })
    }
    paths = (isString(paths) ? [paths] : paths).map(stringifyPath)
    return nFormInst.value?.validate(
      (errors, extra) => addValidateResults(errors, extra, false),
      (rule) => {
        return paths.includes(rule.key!) && !(rule as any).readonly
      },
    )
  }

  function submit() {
    if (submiting.value)
      return
    validate()
      ?.then(({ warnings }) => {
        if (onSubmit) {
          const values = getFieldsTransformedValue()
          const response = onSubmit(values, warnings ?? [])
          if (response instanceof Promise) {
            submiting.value = true
            response.finally(() => {
              submiting.value = false
            })
          }
          return response
        }
      })
      ?.catch((errors) => {
        if (!onSubmitFailed) {
          throw errors
        }
        onSubmitFailed(errors)
      })
  }

  function restoreValidation(paths?: InternalPath) {
    if (!paths) {
      nFormInst.value?.restoreValidation()
      return
    }
    const field = fieldStore.getFieldByPath(paths)
    if (field && field[fieldExtraKey]) {
      const { proFormItemInst } = field[fieldExtraKey] as FieldExtraInfo
      const formItemInst = proFormItemInst.value
      formItemInst && formItemInst.restoreValidation()
    }
  }

  function restoreFieldValue(path: InternalPath) {
    pauseDependenciesTrigger()
    resetFieldValue(path)
    restoreValidation(path)
    clearValidationResults(path)
    onReset && onReset()
    nextTick(resumeDependenciesTrigger)
  }

  function restoreFieldsValue() {
    pauseDependenciesTrigger()
    resetFieldsValue()
    restoreValidation()
    clearValidationResults()
    onReset && onReset()
    nextTick(resumeDependenciesTrigger)
  }

  function addValidateResults(
    errors: ValidateError[][] | undefined,
    extra: {
      warnings: ValidateError[][] | undefined
    },
    clear = true,
  ) {
    const es = errors ?? []
    const ws = extra.warnings ?? []
    clear && clearValidationResults()

    es.forEach((e) => {
      const path = e[0].field
      addValidationErrors(path, e)
    })

    ws.forEach((e) => {
      const path = e[0].field
      addValidationWarnings(path, e)
    })
  }

  const returned: CreateProFormReturn = {
    submit,
    validate,
    matchPath,
    getFieldValue,
    setFieldValue,
    getFieldsValue,
    setFieldsValue,
    resetFieldValue,
    setInitialValue,
    setInitialValues,
    resetFieldsValue,
    restoreValidation,
    restoreFieldValue,
    restoreFieldsValue,
    getFieldValidationResult,
    pauseDependenciesTrigger,
    getFieldsTransformedValue,
    resumeDependenciesTrigger,
    [proFormInternalKey]: {
      internalForm,
      registerNFormInst,
      validationResults,
      model: valueStore.values,
    },
    submiting: computed(() => submiting.value),
    values: __DEV__ ? readonly(valueStore.values) : valueStore.values,
  }
  return Object.freeze(returned)
}

const proFormContextKey = createInjectionKey<CreateProFormReturn>('pro-form')

export function provideProForm(form: CreateProFormReturn) {
  provide(proFormContextKey, form)
}

export function useInjectProForm<Values = any>(): Simplify<CreateProFormReturn<Values>> | null {
  return inject(proFormContextKey, null)
}

export type ExtendProForm<V = any, PM extends object = object, PO extends object = object> = Merge<
  Merge<Omit<CreateProFormReturn<V>, typeof proFormInternalKey>, PM>,
  {
    [proFormInternalKey]: Merge<CreateProFormReturn<V>[typeof proFormInternalKey], PO>
  }
>

export function extendProForm<
  Values = any,
  PublicMethods extends object = object,
  PrivateOptions extends object = object,
>(
  options: Simplify<CreateProFormOptions<Values>>,
  publicMethods: PublicMethods,
  privateOptions: PrivateOptions,
): ExtendProForm<Values, PublicMethods, PrivateOptions> {
  let returned = createProForm(options) as any

  if (publicMethods) {
    returned = {
      ...returned,
      ...publicMethods,
    }
  }

  if (privateOptions) {
    returned = {
      ...returned,
      [proFormInternalKey]: {
        ...returned[proFormInternalKey],
        ...privateOptions,
      },
    }
  }

  return Object.freeze(returned)
}
