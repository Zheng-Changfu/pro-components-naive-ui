<script lang="tsx">
import type { FormInst, FormProps } from 'naive-ui'
import { NForm } from 'naive-ui'
import type { BaseField, Path } from 'pro-components-hooks'
import { createForm, stringifyPath, useCompile } from 'pro-components-hooks'
import { computed, defineComponent, provide, ref, toRef } from 'vue'
import { isString, toPath } from 'lodash-es'
import { useOmitProps } from '../hooks'
import { useInjectGlobalConfigContext } from '../config-provider'
import { proFormItemRenderContextKey, proFormReadonlyContextKey, provideProFormInstanceContext } from './context'
import { proFormExtendProps, proFormProps } from './props'
import type { ProFormInstance } from './inst'
import type { ProFieldConfig } from './field'
import { ProFieldConfigKey } from './field'

export default defineComponent({
  name: 'ProForm',
  props: proFormProps,
  setup(props, { expose }) {
    const formInstRef = ref<FormInst>()
    const formProps = useOmitProps(props, proFormExtendProps)
    const { scope: globalScope } = useInjectGlobalConfigContext().proForm

    const {
      initialValues,
      scope: propScope,
      onFieldValueChange,
    } = props

    const expressionScope = {
      ...(globalScope ?? {}),
      ...(propScope ?? {}),
    }

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
      getFieldsTransformedValue,
    } = createForm({
      initialValues,
      expressionScope,
      onFieldValueChange,
      onDependenciesValueChange,
    })

    const parsedDisabled = useCompile(toRef(props, 'disabled'), { scope })
    const parsedReadonly = useCompile(toRef(props, 'readonly'), { scope })

    const nFormProps = computed<FormProps>(() => {
      return {
        ...formProps.value,
        rules: undefined,
        ref: formInstRef,
        model: valueStore.values.value,
        disabled: parsedDisabled.value,
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
        if (props.onDependenciesValueChange) {
          props.onDependenciesValueChange({ path, value, dependPath })
        }
      }
    }

    function submit() {
      const {
        onSubmit,
        onSubmitFailed,
      } = props

      return validate()
        .then(({ warnings }) => {
          const values = getFieldsTransformedValue()
          onSubmit && onSubmit(values, warnings ?? [])
        })
        .catch((errors) => {
          onSubmitFailed && onSubmitFailed(errors)
        })
    }

    let shouldTriggerValidate = true
    function validate(paths?: string | string[]) {
      if (!shouldTriggerValidate)
        return Promise.resolve({ warnings: undefined })
      if (!paths) {
        return formInstRef.value!.validate()
      }
      paths = (isString(paths) ? [paths] : paths).map(stringifyPath)
      return formInstRef.value!.validate(
        undefined,
        rule => paths.includes(rule.key!),
      )
    }

    function restoreValidation(paths?: string | string[]) {
      if (!paths) {
        formInstRef.value!.restoreValidation()
        return
      }
      const normalizedPaths = (isString(paths) ? [paths] : paths).map(stringifyPath) as Array<string>
      normalizedPaths.forEach((path) => {
        const field = fieldStore.fieldsPathMap.value.get(path)
        if (!field || !field[ProFieldConfigKey])
          return
        const proFieldConfig: ProFieldConfig = field[ProFieldConfigKey]
        const formItemInst = proFieldConfig.formItemInstRef.value
        formItemInst.restoreValidation()
      })
    }

    function restoreFieldValue(path: Path) {
      shouldTriggerValidate = false
      resetFieldValue(path)
      restoreValidation(toPath(path))
      shouldTriggerValidate = true
    }

    function restoreFieldsValue() {
      shouldTriggerValidate = false
      resetFieldsValue()
      restoreValidation()
      shouldTriggerValidate = true
    }

    const exposed: ProFormInstance = {
      submit,
      validate,
      matchPath,
      getFieldValue,
      setFieldValue,
      getFieldsValue,
      setFieldsValue,
      setInitialValue,
      setInitialValues,
      restoreValidation,
      resetFieldValue,
      resetFieldsValue,
      restoreFieldValue,
      restoreFieldsValue,
      getScope: () => scope,
      getFieldsTransformedValue,
    }

    expose(exposed)
    provideProFormInstanceContext(exposed)
    provide(proFormReadonlyContextKey, parsedReadonly)
    provide(proFormItemRenderContextKey, props.formItemRender)
    return {
      nFormProps,
    }
  },
  render() {
    const {
      $slots,
      nFormProps,
    } = this
    return <NForm {...nFormProps} v-slots={$slots}></NForm>
  },
})
</script>
