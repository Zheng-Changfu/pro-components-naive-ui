import type { ArrayField } from 'pro-components-hooks'
import { useInjectFieldContext } from 'pro-components-hooks'
import { useInjectProFormInst } from '../../form'
import { AUTO_CREATE_ID } from '../../form-list'

/**
 * 本质上是控制 'readonly' 属性的变化
 */
export function useEditable() {
  const form = useInjectProFormInst()
  const editableKeys = []

  const {
    stringPath,
    value: list,
  } = useInjectFieldContext() as ArrayField

  function getRowId(index: number): string {
    if (form && stringPath.value) {
      return list.value[index][AUTO_CREATE_ID]
    }
    return ''
  }

  function getEditable() {

  }

  function startEditable(index: number) {
    const rowId = getRowId(index)
    if (rowId) {

    }
  }

  function startEditableWithOmit(index: number, paths: string[]) {

  }

  function startEditableWithPick(index: number, paths: string[]) {

  }

  function cancelEditable(index: number) {

  }

  function cancelEditableWithOmit(index: number, paths: string[]) {

  }

  function cancelEditableWithPick(index: number, paths: string[]) {

  }

  function cancelEditableWithSave(index: number) {

  }

  function cancelEditableWithRestore(index: number) {

  }

  return {
    getEditable,
    startEditable,
    cancelEditable,
    startEditableWithOmit,
    startEditableWithPick,
    cancelEditableWithOmit,
    cancelEditableWithPick,
    cancelEditableWithSave,
    cancelEditableWithRestore,
  }
}
