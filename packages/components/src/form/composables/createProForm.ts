import type { FormInst } from 'naive-ui'
import type { BaseField, BaseForm, FormOptions, InternalPath } from 'pro-components-hooks'
import type { Simplify } from 'type-fest'
import type { ComputedRef } from 'vue'
import type { FieldExtraInfo } from '../components'
import type { FormItemInternalValidateResult } from './useValidationResult'
import { isString, toPath } from 'lodash-es'
import { createForm, stringifyPath } from 'pro-components-hooks'
import { fieldExtraKey } from '../components'
import { useValidationResults } from './useValidationResult'

export interface ValidateError {
  field?: string
  fieldValue?: any
  message?: string
}

const proFormContextKey = Symbol('proForm')
export const proFormInternalKey = Symbol('proFormInternalKey')

type CreateProFormReturn<Values = any> = Simplify<Pick<
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
  restoreFieldValue: (path: InternalPath) => void
  /**
   * 清空校验
   */
  restoreValidation: (paths?: InternalPath) => void
  /**
   * 校验
   */
  validate: (paths?: InternalPath) => ReturnType<FormInst['validate']> | undefined
  /**
   * 是否正在提交，需要提供 onSubmit 函数才会生效
   */
  submiting: ComputedRef<boolean>
  /**
   * 内部使用
   */
  [proFormInternalKey]: {
    model: Ref<Record<string, any>>
    registerNFormInst: (nForm: FormInst) => void
    getFieldValidationResult: (path: InternalPath) => FormItemInternalValidateResult | null
  }
}>

interface CreateFormOptions<Values = any> extends FormOptions<Values> {
  /**
   * 数据重置后的回调事件
   */
  onReset?: () => void
  /**
   * 数据验证成功后的回调事件,如果返回了 Promise, submiting 将等待这个 Promise 完成
   */
  onSubmit?: (values: Values, warnings: ValidateError[][]) => void | Promise<void>
  /**
   * 数据验证失败后回调事件
   */
  onSubmitFailed?: (errors: ValidateError[][]) => void
}

export function createProForm<Values = any>(options: Simplify<CreateFormOptions<Values>> = {}): CreateProFormReturn<Values> {
  const {
    onReset,
    onSubmit,
    initialValues,
    onSubmitFailed,
    onFieldValueChange,
  } = options

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
  } = createForm({
    initialValues,
    onFieldValueChange,
    onDependenciesValueChange,
  })

  const {
    addValidationErrors,
    addValidationWarnings,
    clearValidationResults,
    getFieldValidationResult,
  } = useValidationResults()

  const submiting = ref(false)
  const nFormInst = ref<FormInst>()

  function registerNFormInst(nForm: FormInst) {
    nFormInst.value = nForm
  }

  function onDependenciesValueChange(opt: {
    value: any
    path: string[]
    field: BaseField
    dependPath: string[]
  }) {
    const {
      field,
      path,
      value,
      dependPath,
    } = opt

    if (field.show.value) {
      validate(stringifyPath(opt.dependPath))
      if (options.onDependenciesValueChange) {
        options.onDependenciesValueChange({
          path,
          value,
          field,
          dependPath,
        })
      }
    }
  }

  function validate(paths?: string | string[]) {
    if (!paths) {
      return nFormInst.value?.validate(addValidateResults)
    }
    paths = (isString(paths) ? [paths] : paths).map(stringifyPath)
    return nFormInst.value?.validate(addValidateResults, rule => paths.includes(rule.key!))
  }

  function submit() {
    if (submiting.value)
      return
    validate()
      ?.then(({ warnings }) => {
        if (onSubmit) {
          submiting.value = true
          const values = getFieldsTransformedValue()
          return Promise
            .resolve(onSubmit(values, warnings ?? []))
            .finally(() => {
              submiting.value = false
            })
        }
      })
      ?.catch((errors) => {
        onSubmitFailed && onSubmitFailed(errors)
      })
  }

  function restoreValidation(paths?: InternalPath) {
    if (!paths) {
      nFormInst.value?.restoreValidation()
      return
    }
    const normalizedPaths = (isString(paths) ? [paths] : paths).map(stringifyPath) as Array<string>
    normalizedPaths.forEach((path) => {
      const field = fieldStore.fieldsPathMap.value.get(path)
      if (!field || !field[fieldExtraKey])
        return
      const { proFormItemInst } = field[fieldExtraKey] as FieldExtraInfo
      const formItemInst = proFormItemInst.value
      formItemInst && formItemInst.restoreValidation()
    })
  }

  function restoreFieldValue(path: InternalPath) {
    pauseDependenciesTrigger()
    resetFieldValue(path)
    onReset && onReset()
    clearValidationResults(path)
    restoreValidation(toPath(path))
    nextTick(resumeDependenciesTrigger)
  }

  function restoreFieldsValue() {
    pauseDependenciesTrigger()
    resetFieldsValue()
    onReset && onReset()
    restoreValidation()
    clearValidationResults()
    nextTick(resumeDependenciesTrigger)
  }

  function addValidateResults(
    errors: ValidateError[][] | undefined,
    extra: {
      warnings: ValidateError[][] | undefined
    },
  ) {
    const es = errors ?? []
    const ws = extra.warnings ?? []
    clearValidationResults()

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
    pauseDependenciesTrigger,
    getFieldsTransformedValue,
    resumeDependenciesTrigger,
    [proFormInternalKey]: {
      registerNFormInst,
      getFieldValidationResult,
      model: valueStore.values,
    },
    submiting: computed(() => submiting.value),
  }
  provide(proFormContextKey, returned)
  return returned
}

export function useInjectProForm<Values = any>(): CreateProFormReturn<Values> | undefined {
  return inject(proFormContextKey)
}
