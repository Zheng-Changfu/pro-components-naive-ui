import type { ComputedRef } from 'vue'
import type { ProFormProps } from '../../../../form'
import type { ProSearchFormProps } from '../props'
import { pick } from 'lodash-es'
import { proFormProps as formProps, useProFormInst } from '../../../../form'

export function useGridForm(props: ComputedRef<ProSearchFormProps>) {
  const [formInstRef, formMethods] = useProFormInst()

  const proFormProps = computed<ProFormProps>(() => {
    return {
      ref: formInstRef,
      ...pick(props.value, Object.keys(formProps)),
      onSubmit,
    }
  })

  function reset() {
    const form = formInstRef.value
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
    const form = formInstRef.value
    if (!form)
      return

    form.submit()
  }

  return {
    reset,
    search,
    formMethods,
    formInstRef,
    proFormProps,
  }
}
