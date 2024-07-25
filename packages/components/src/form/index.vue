<script lang="tsx">
import type { FormInst, FormProps } from 'naive-ui'
import { NForm } from 'naive-ui'
import type { BaseField, Path } from 'pro-components-hooks'
import { createForm, stringifyPath, useCompile } from 'pro-components-hooks'
import { computed, defineComponent, nextTick, provide, ref, toRef } from 'vue'
import { isString, merge, toPath } from 'lodash-es'
import { useOmitProps } from '../hooks'
import { useInjectGlobalConfig } from '../config-provider'
import { proFormContextKey, provideProFormInstance } from './context'
import { proFormExtendProps, proFormProps } from './props'
import type { ProFormInstance } from './inst'
import type { ProFieldConfig } from './field'
import { proFieldConfigKey } from './field'
import { defaultValidateMessages } from './form-item'

export default defineComponent({
  name: 'ProForm',
  props: proFormProps,
  setup(props, { expose }) {
    const formInstRef = ref<FormInst>()
    const formProps = useOmitProps(props, proFormExtendProps)

    const {
      scope: globalScope,
      validateMessages: globalValidateMessages,
    } = useInjectGlobalConfig().proForm

    const {
      initialValues,
      scope: propScope,
      onFieldValueChange,
      validateMessages: propValidateMessages,
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
      pauseDependenciesTrigger,
      resumeDependenciesTrigger,
      getFieldsTransformedValue,
    } = createForm({
      initialValues,
      expressionScope,
      onFieldValueChange,
      onDependenciesValueChange,
    })

    const validateMessages = computed(() => {
      return merge(
        { ...defaultValidateMessages },
        { ...(globalValidateMessages ?? {}) },
        { ...(propValidateMessages ?? {}) },
      )
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
        /**
         * naive ui 没有实现校验模版，我们自己实现
         */
        // validateMessages: validateMessages.value,
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
      const normalizedPaths = (isString(paths) ? [paths] : paths).map(stringifyPath) as Array<string>
      normalizedPaths.forEach((path) => {
        const field = fieldStore.fieldsPathMap.value.get(path)
        if (!field || !field[proFieldConfigKey])
          return
        const proFieldConfig: ProFieldConfig = field[proFieldConfigKey]
        const formItemInst = proFieldConfig?.nFormItemInstRef?.value
        formItemInst && formItemInst.restoreValidation()
      })
    }

    function restoreFieldValue(path: Path) {
      pauseDependenciesTrigger()
      resetFieldValue(path)
      restoreValidation(toPath(path))
      nextTick(resumeDependenciesTrigger)
    }

    function restoreFieldsValue() {
      pauseDependenciesTrigger()
      resetFieldsValue()
      restoreValidation()
      nextTick(resumeDependenciesTrigger)
    }

    const exposed: ProFormInstance = {
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
      getScope: () => scope,
      pauseDependenciesTrigger,
      getFieldsTransformedValue,
      resumeDependenciesTrigger,
    }

    expose(exposed)
    provideProFormInstance(exposed)
    provide(proFormContextKey, {
      readonly: parsedReadonly,
      formItemRender: props.formItemRender,
      mergedValidateMessages: validateMessages,
    })
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
