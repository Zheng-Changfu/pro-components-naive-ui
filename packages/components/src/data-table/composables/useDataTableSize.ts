import type { DataTableProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { computed } from 'vue'

export function useDataTableSize(props: ComputedRef<ProDataTableProps>) {
  const size = ref<DataTableProps['size']>()

  watchImmediate(
    () => props.value.size,
    v => v && (size.value = v),
  )

  function setSize(value: DataTableProps['size'] & {}) {
    size.value = value
  }

  return {
    size: computed(() => size.value ?? 'medium'),
    setSize,
  }
}
