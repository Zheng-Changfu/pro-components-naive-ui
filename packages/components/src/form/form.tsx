import type { FormInst, FormProps } from 'naive-ui'
import type { BaseField, InternalPath } from 'pro-components-hooks'
import type { SlotsType } from 'vue'
import type { FieldExtraInfo } from './components'
import type { ProFormInst } from './inst'
import type { ValidateError } from './props'
import type { ProFormSlots } from './slots'
import { isString, toPath } from 'lodash-es'
import { NForm } from 'naive-ui'
import { createForm, stringifyPath, useCompile } from 'pro-components-hooks'
import { computed, nextTick, provide } from 'vue'
import { useOmitProps, useOverrideProps } from '../composables'
import { fieldExtraKey } from './components'
import { useValidationResults } from './composables/useValidationResult'
import { proFormContextKey, provideProFormInst } from './context'
import { proFormExtendProps, proFormProps } from './props'

const name = 'ProForm'
export default defineComponent({
  name,
  props: proFormProps,
  slots: Object as SlotsType<ProFormSlots>,
  setup(props, { expose }) {
    const formInstRef = ref<FormInst>()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const formProps = useOmitProps(
      overridedProps,
      proFormExtendProps,
    )

    const {
      addValidationErrors,
      addValidationWarnings,
      clearValidationResults,
      getFieldValidationResult,
    } = useValidationResults()

    const {
      initialValues,
      onFieldValueChange,
    } = overridedProps.value

    const expressionScope = computed(() => {
      return overridedProps.value.scope ?? {}
    })

    const {
      scope,
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
      expressionScope,
      onFieldValueChange,
      onDependenciesValueChange,
    })

    /**
     * 表单的 disabled 和 readonly 支持表达式
     */
    const parsedDisabled = useCompile(computed(() => overridedProps.value.disabled), { scope })
    const parsedReadonly = useCompile(computed(() => overridedProps.value.readonly), { scope })

    const nFormProps = computed<FormProps>(() => {
      return {
        ...formProps.value,
        rules: undefined,
        ref: formInstRef,
        model: valueStore.values.value,
        disabled: parsedDisabled.value,
        /**
         * 支持 button `attr-type = submit` 提交表单
         */
        onSubmit: (e) => {
          e.preventDefault()
          submit()
        },
        /**
         * 支持 button `attr-type = reset` 重置表单
         */
        onReset: (e: Event) => {
          e.preventDefault()
          restoreFieldsValue()
        },
      }
    })

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
        if (overridedProps.value.onDependenciesValueChange) {
          overridedProps.value.onDependenciesValueChange({ path, value, dependPath })
        }
      }
    }

    function submit() {
      const {
        onSubmit,
        onSubmitFailed,
      } = overridedProps.value
      return validate()
        .then(({ warnings }) => {
          const values = getFieldsTransformedValue()
          return onSubmit && onSubmit(values, warnings ?? [])
        })
        .catch((errors) => {
          onSubmitFailed && onSubmitFailed(errors)
        })
    }

    function validate(paths?: string | string[]) {
      if (!paths) {
        return formInstRef.value!.validate(addValidateResults)
      }
      paths = (isString(paths) ? [paths] : paths).map(stringifyPath)
      return formInstRef.value!.validate(addValidateResults, rule => paths.includes(rule.key!))
    }

    function restoreValidation(paths?: string | string[]) {
      if (!paths) {
        formInstRef.value!.restoreValidation()
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
      clearValidationResults(path)
      restoreValidation(toPath(path))
      nextTick(resumeDependenciesTrigger)
    }

    function restoreFieldsValue() {
      pauseDependenciesTrigger()
      resetFieldsValue()
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

    const exposed: ProFormInst = {
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
      getScope: () => scope.value,
    }

    provideProFormInst(exposed)
    provide(proFormContextKey, {
      addValidationErrors,
      addValidationWarnings,
      clearValidationResults,
      readonly: parsedReadonly,
      validateBehavior: computed(() => overridedProps.value.validateBehavior),
      readonlyEmptyText: computed(() => overridedProps.value.readonlyEmptyText),
      validationTrigger: computed(() => overridedProps.value.validationTrigger),
      validateBehaviorProps: computed(() => overridedProps.value.validateBehaviorProps),
    })

    expose(exposed)
    return {
      nFormProps,
    }
  },
  render() {
    return (
      <NForm
        {...this.nFormProps}
        v-slots={this.$slots}
      />
    )
  },
})
