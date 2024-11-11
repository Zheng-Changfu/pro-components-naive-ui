import type { ComputedRef } from 'vue'
import type { ProFormInst, ProFormProps } from '../../../../form'
import type { ProSearchFormProps } from '../props'
import { pick } from 'lodash-es'
import { ref } from 'vue'
import { proFormProps as formProps } from '../../../../form'

export function useGridForm(props: ComputedRef<ProSearchFormProps>) {
  const instRef = ref<ProFormInst>()

  const proFormProps = computed<ProFormProps>(() => {
    return {
      ref: instRef,
      ...pick(props.value, Object.keys(formProps)),
      onSubmit,
    }
  })

  function reset() {
    const form = instRef.value
    if (!form)
      return

    const { onReset } = props.value
    form.restoreFieldsValue()
    onReset && onReset()
  }

  function onSubmit(values: any, warnings: any) {
    const { onSubmit, onSearch } = props.value
    onSearch && onSearch(values)
    onSubmit && onSubmit(values, warnings)
  }

  function search() {
    const form = instRef.value
    if (!form)
      return

    form.submit()
  }

  const methods: ProFormInst = {
    submit: () => instRef.value?.submit() as any,
    getScope: () => instRef.value?.getScope() as any,
    validate: () => instRef.value?.validate() as any,
    getFieldsValue: () => instRef.value?.getFieldsValue() as any,
    resetFieldsValue: () => instRef.value?.resetFieldsValue() as any,
    matchPath: (value: any) => instRef.value?.matchPath(value) as any,
    restoreValidation: () => instRef.value?.restoreValidation() as any,
    restoreFieldsValue: () => instRef.value?.restoreFieldsValue() as any,
    getFieldValue: (value: any) => instRef.value?.getFieldValue(value) as any,
    setFieldsValue: (value: any) => instRef.value?.setFieldsValue(value) as any,
    resetFieldValue: (value: any) => instRef.value?.resetFieldValue(value) as any,
    setInitialValues: (value: any) => instRef.value?.setInitialValues(value) as any,
    pauseDependenciesTrigger: () => instRef.value?.pauseDependenciesTrigger() as any,
    restoreFieldValue: (value: any) => instRef.value?.restoreFieldValue(value) as any,
    getFieldsTransformedValue: () => instRef.value?.getFieldsTransformedValue() as any,
    resumeDependenciesTrigger: () => instRef.value?.resumeDependenciesTrigger() as any,
    setFieldValue: (path: any, value: any) => instRef.value?.setFieldValue(path, value) as any,
    setInitialValue: (path: any, value: any) => instRef.value?.setInitialValue(path, value) as any,
    getFieldValidationResult: (value: any) => instRef.value?.getFieldValidationResult(value) as any,
  }

  return {
    reset,
    search,
    proFormProps,
    formInstRef: instRef,
    formMethods: methods,
  }
}
