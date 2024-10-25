import type { DataTableProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { computed, watchEffect } from 'vue'

export function useDataTableSize(props: ComputedRef<ProDataTableProps>) {
  const size = ref<DataTableProps['size']>()

  function setSize(value: DataTableProps['size'] & {}) {
    size.value = value
  }

  watchEffect(() => {
    const value = props.value.size
    if (value) {
      size.value = value
    }
  })

  return {
    size: computed(() => size.value ?? 'medium'),
    setSize,
  }
}
