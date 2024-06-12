<script lang="tsx">
import type { FormInst, FormItemInst, FormProps } from 'naive-ui'
import { NForm } from 'naive-ui'
import { createForm, stringifyPath, useCompile } from 'pro-components-hooks'
import { computed, defineComponent, provide, ref, toRef } from 'vue'
import { isString, toPath } from 'lodash-es'
import { useOmitProps } from '../hooks'
import { useMergeProFormGlobalConfig } from '../config-provider'
import { proFormMergedConfigContextKey, proFormReadonlyContextKey, provideProFormInstanceContext } from './context'
import { proFormExtendProps, proFormProps } from './props'
import type { ProFormInstance } from './inst'

export default defineComponent({
  name: 'ProForm',
  props: proFormProps,
  setup(props, { expose }) {
    const formInstRef = ref<FormInst>()
    const mergedConfig = useMergeProFormGlobalConfig(props)
    const formProps = useOmitProps(props, proFormExtendProps)

    const {
      expressionContext,
    } = mergedConfig.value

    const {
      initialValues,
      onFieldValueChange,
    } = props

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
      expressionContext,
      onFieldValueChange,
      onDependenciesValueChange,
    })

    const compiledDisabled = useCompile(toRef(props, 'disabled'), { scope })
    const compiledReadonly = useCompile(toRef(props, 'readonly'), { scope })

    const getFormProps = computed<FormProps>(() => {
      return {
        ...formProps.value,
        rules: {},
        ref: formInstRef,
        model: values.value,
        disabled: compiledDisabled.value,
      }
    })

    function onDependenciesValueChange(opt: { path: string, value: any }) {
      const { path } = opt
      const { onDependenciesValueChange: _onDependenciesValueChange } = props
      validate(path)
      _onDependenciesValueChange && _onDependenciesValueChange(opt)
    }

    function validate(paths?: string | string[]) {
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
        if (!field || !field['x-form-item-instance-ref'])
          return
        const formItemInst = field['x-form-item-instance-ref'].value as FormItemInst
        formItemInst.restoreValidation()
      })
    }

    const exposed: ProFormInstance = {
      validate,
      matchPath,
      getFieldValue,
      setFieldValue,
      getFieldsValue,
      setFieldsValue,
      resetFieldValue,
      setInitialValue,
      resetFieldsValue,
      setInitialValues,
      restoreValidation,
      getFieldsTransformedValue,
    }

    expose(exposed)
    provideProFormInstanceContext(exposed)
    provide(proFormReadonlyContextKey, compiledReadonly)
    provide(proFormMergedConfigContextKey, mergedConfig)
    return {
      getFormProps,
    }
  },
  render() {
    const {
      $slots,
      getFormProps,
    } = this
    return <NForm {...getFormProps} v-slots={$slots}></NForm>
  },
})
</script>
