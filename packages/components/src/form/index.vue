<script lang="tsx">
import type { FormInst, FormProps } from 'naive-ui'
import { NForm } from 'naive-ui'
import type { Path } from 'pro-components-hooks'
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
    const { expressionScope: globalExpressionScope } = useInjectGlobalConfigContext().proForm

    const {
      initialValues,
      onFieldValueChange,
      expressionScope: propExpressionScope,
    } = props

    const expressionScope = {
      ...(propExpressionScope ?? {}),
      ...(globalExpressionScope ?? {}),
    }

    const {
      scope,
      values,
      pathField,
      matchPath,
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

    const compiledDisabled = useCompile(toRef(props, 'disabled'), { scope })
    const compiledReadonly = useCompile(toRef(props, 'readonly'), { scope })

    const nFormProps = computed<FormProps>(() => {
      return {
        ...formProps.value,
        rules: undefined,
        ref: formInstRef,
        model: values.value,
        disabled: compiledDisabled.value,
      }
    })

    function onDependenciesValueChange(opt: { path: string[], depPath: string[], value: any }) {
      validate(stringifyPath(opt.depPath))
      if (props.onDependenciesValueChange) {
        props.onDependenciesValueChange(opt)
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
      const normalizedPaths = (isString(paths) ? [paths] : paths).map(toPath) as Array<string[]>
      normalizedPaths.forEach((path) => {
        const field = pathField.get(path)
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
      getFieldsTransformedValue,
      getExpressionScope: () => scope,
    }

    expose(exposed)
    provideProFormInstanceContext(exposed)
    provide(proFormReadonlyContextKey, compiledReadonly)
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
