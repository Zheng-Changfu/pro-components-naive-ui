import type { DataTableRowKey } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { ref } from 'vue'
import { call } from '../../_utils/call'

export function useCheckedRowKeys(props: ComputedRef<ProDataTableProps>) {
  const checkedRowKeys = ref<DataTableRowKey[]>([])

  function setCheckedRowKeys(keys: DataTableRowKey[], rows?: any, meta?: any) {
    checkedRowKeys.value = keys

    const {
      onUpdateCheckedRowKeys,
      'onUpdate:checkedRowKeys': _onUpdateCheckedRowKeys,
    } = props.value

    onUpdateCheckedRowKeys && call(onUpdateCheckedRowKeys, keys, rows, meta)
    _onUpdateCheckedRowKeys && call(_onUpdateCheckedRowKeys, keys, rows, meta)
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

  watchImmediate(
    () => props.value.checkedRowKeys,
    (values) => {
      checkedRowKeys.value = values ?? []
    },
  )

  return {
    checkedRowKeys,
    setCheckedRowKeys,
    clearCheckedRowKeys,
    removeCheckedRowKey,
  }
}
