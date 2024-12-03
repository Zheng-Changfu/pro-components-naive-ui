import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { EditDataTableProps } from '../edit-data-table'
import { watchImmediate } from '@vueuse/core'
import { useInjectListField } from 'pro-composables'
import { ref } from 'vue'
import { call } from '../../../_utils/call'
import { useInjectProForm } from '../../../form'

/**
 * 本质上是控制 'readonly' 属性的变化
 */
export function useEditable(props: EditDataTableProps) {
  const form = useInjectProForm()
  const editableKeys = ref<Set<RowKey>>(new Set())

  const {
    value: list,
    stringPath: tablePath,
  } = useInjectListField()!

  function resolveRowKey(row: any) {
    return props.rowKey
      ? (props.rowKey(row) ?? null)
      : null
  }

  function getRowKey(index: number) {
    const row = list.value[index]
    return row
      ? resolveRowKey(row)
      : null
  }

  function getEditable(index: number) {
    const key = getRowKey(index)
    return key !== null && editableKeys.value.has(key)
  }

  function startEditable(index: number) {
    const key = getRowKey(index)
    if (key !== null && !editableKeys.value.has(key)) {
      editableKeys.value.add(key)
      const rowPath = `${tablePath.value}.${index}`
      if (form) {
        form.setInitialValue(rowPath, form.getFieldValue(rowPath))
      }
      doUpdateEditableKeys()
    }
  }

  function cancelEditable(index: number) {
    const key = getRowKey(index)
    if (key !== null && editableKeys.value.has(key)) {
      editableKeys.value.delete(key)
    }
    doUpdateEditableKeys()
  }

  function cancelEditableAndRestore(index: number) {
    const key = getRowKey(index)
    if (key !== null && editableKeys.value.has(key)) {
      editableKeys.value.delete(key)
      const rowPath = `${tablePath.value}.${index}`
      if (form) {
        form.resetFieldValue(rowPath)
      }
      doUpdateEditableKeys()
    }
  }

  function doUpdateEditableKeys() {
    const {
      onUpdateEditableKeys,
      'onUpdate:editableKeys': _onUpdateEditableKeys,
    } = props

    if (onUpdateEditableKeys) {
      call(onUpdateEditableKeys, Array.from(editableKeys.value))
    }
    if (_onUpdateEditableKeys) {
      call(_onUpdateEditableKeys, Array.from(editableKeys.value))
    }
  }

  watchImmediate(
    () => props.editableKeys,
    (keys) => {
      editableKeys.value = new Set(keys ?? [])
    },
  )

  return {
    getEditable,
    startEditable,
    cancelEditable,
    cancelEditableAndRestore,
  }
}
