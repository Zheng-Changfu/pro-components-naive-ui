import type { ComputedRef } from 'vue'
import type { ProDescriptionsProps } from '../props'
import { watchDeep } from '@vueuse/core'
import { createForm } from 'pro-composables'

export function useDataSource(props: ComputedRef<ProDescriptionsProps>) {
  const {
    getFieldsValue,
    setFieldsValue,
  } = createForm({
    initialValues: props.value.data ?? {},
  })

  watchDeep(
    () => props.value.data,
    (value) => {
      setFieldsValue(value ?? {}, 'overwrite')
    },
  )

  const data = computed(() => {
    return getFieldsValue(true)
  })

  return {
    data,
    setData: setFieldsValue,
  }
}
