import type { DataTableRowKey } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { ref } from 'vue'

export function useExpandedRowKeys(props: ComputedRef<ProDataTableProps>) {
  const expandedRowKeys = ref<DataTableRowKey[]>([])

  watchImmediate(
    computed(() => props.value.expandedRowKeys ?? []),
    v => expandedRowKeys.value = v,
  )

  function expandAll() {

  }

  function setExpandedRowKeys() {

  }

  return {
    expandAll,
    expandedRowKeys: computed(() => expandedRowKeys.value),
    setExpandedRowKeys,
  }
}
