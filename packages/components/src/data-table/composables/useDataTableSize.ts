import type { DataTableProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { computed, ref } from 'vue'

export function useDataTableSize(props: ComputedRef<ProDataTableProps>) {
  const size = ref<DataTableProps['size']>()

  function setSize(value: DataTableProps['size'] & {}) {
    size.value = value
  }

  watchImmediate(
    () => props.value.size,
    (value) => {
      if (value) {
        size.value = value
      }
    },
  )

  return {
    setSize,
    size: computed(() => size.value ?? 'medium'),
  }
}
