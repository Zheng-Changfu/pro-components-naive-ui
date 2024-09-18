import type { DataTableRowKey } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { computed } from 'vue'

export function useCheckedRowKeys(props: ComputedRef<ProDataTableProps>) {
  const checkedRowKeys = ref<DataTableRowKey[]>([])

  watchImmediate(
    computed(() => props.value.checkedRowKeys ?? []),
    v => checkedRowKeys.value = v,
  )

  function setCheckedRowKeys(keys: DataTableRowKey[]) {
    checkedRowKeys.value = keys

    const {
      onUpdateCheckedRowKeys,
      'onUpdate:checkedRowKeys': _onUpdateCheckedRowKeys,
    } = props.value

    // @ts-expect-error
    onUpdateCheckedRowKeys && onUpdateCheckedRowKeys(keys)
    // @ts-expect-error
    _onUpdateCheckedRowKeys && _onUpdateCheckedRowKeys(keys)
  }

  function clearCheckedRowKeys() {
    setCheckedRowKeys([])
  }

  function removeCheckedRowKey(key: DataTableRowKey) {
    const keys = checkedRowKeys.value.filter(rowKey => rowKey !== key)
    if (keys.length !== checkedRowKeys.value.length) {
      setCheckedRowKeys(keys)
    }
  }

  return {
    checkedRowKeys: computed(() => checkedRowKeys.value),
    setCheckedRowKeys,
    clearCheckedRowKeys,
    removeCheckedRowKey,
  }
}
