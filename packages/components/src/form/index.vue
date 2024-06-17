<script lang="tsx">
import type { FormInst, FormProps } from 'naive-ui'
import { NForm } from 'naive-ui'
import { createForm, stringifyPath, useCompile } from 'pro-components-hooks'
import { computed, defineComponent, provide, ref, toRef } from 'vue'
import { isString, toPath } from 'lodash-es'
import { useOmitProps } from '../hooks'
import { useInjectGlobalConfigContext } from '../config-provider'
import { proFormReadonlyContextKey, provideProFormInstanceContext } from './context'
import { proFormExtendProps, proFormProps } from './props'
import type { ProFormInstance } from './inst'
import type { ProComponentConfig } from './field'
import { ProComponentConfigKey } from './field'

export default defineComponent({
  name: 'ProForm',
  props: proFormProps,
  setup(props, { expose }) {
    const formInstRef = ref<FormInst>()
    const formProps = useOmitProps(props, proFormExtendProps)
    const { expressionContext = {} } = useInjectGlobalConfigContext().proForm

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

    function onDependenciesValueChange(opt: { path: string[], depPath: string[], value: any }) {
      validate(stringifyPath(opt.depPath))
      if (props.onDependenciesValueChange) {
        props.onDependenciesValueChange(opt)
      }
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
        if (!field || !field[ProComponentConfigKey])
          return
        const proComponentConfig: ProComponentConfig = field[ProComponentConfigKey]
        const formItemInst = proComponentConfig.formItemInstRef.value
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
