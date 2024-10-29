import type { ArrayField } from 'pro-components-hooks'
import { useInjectFieldContext } from 'pro-components-hooks'
import { watchEffect } from 'vue'
import { useInjectProFormInst, useReadonlyHelpers } from '../../form'
import { AUTO_CREATE_ID } from '../../form-list'

/**
 * 本质上是控制 'readonly' 属性的变化
 */
export function useEditable() {
  const form = useInjectProFormInst()
  const editableKeys = ref<Set<string>>(new Set())

  const {
    stringPath,
    value: list,
  } = useInjectFieldContext() as ArrayField

  const {
    readonly,
  } = useReadonlyHelpers()

  function getRowKey(index: number): string {
    if (form && stringPath.value) {
      return list.value[index][AUTO_CREATE_ID]
    }
    return ''
  }

  function getEditable(index: number) {
    const rowId = getRowKey(index)
    return !!rowId && editableKeys.value.has(rowId)
  }

  function startEditable(index: number) {
    const rowId = getRowKey(index)
    if (rowId && !editableKeys.value.has(rowId)) {
      editableKeys.value.add(rowId)
      const rowPath = `${stringPath.value}.${index}`
      form!.setInitialValue(rowPath, form!.getFieldValue(rowPath))
    }
  }

  function cancelEditable(index: number) {
    const rowId = getRowKey(index)
    if (rowId && editableKeys.value.has(rowId)) {
      editableKeys.value.delete(rowId)
    }
  }

  function cancelEditableWithRestore(index: number) {
    const rowId = getRowKey(index)
    if (rowId && editableKeys.value.has(rowId)) {
      editableKeys.value.delete(rowId)
      const rowPath = `${stringPath.value}.${index}`
      form!.resetFieldValue(rowPath)
    }
  }

  watchEffect(() => {
    const keys: string[] = []
    if (!readonly.value && form && stringPath.value) {
      list.value.forEach((row) => {
        keys.push(row[AUTO_CREATE_ID])
      })
    }
    editableKeys.value = new Set(keys)
  })

  return {
    getEditable,
    startEditable,
    cancelEditable,
    cancelEditableWithRestore,
  }
}
