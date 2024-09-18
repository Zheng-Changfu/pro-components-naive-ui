import type { FieldExtraInfo } from '../keys'
import { useInjectFieldContext } from 'pro-components-hooks'
import { computed, unref } from 'vue'
import { useInjectProFormContext } from '../../../context'
import { fieldExtraKey } from '../keys'
import { isEmptyValue } from '../utils/valueUtil'

export function useReadonlyHelpers() {
  const field = useInjectFieldContext()!
  const fieldExtraInfo = field[fieldExtraKey] as FieldExtraInfo

  const {
    readonlyEmptyText,
  } = useInjectProFormContext()

  const {
    readonly,
  } = fieldExtraInfo

  const empty = computed(() => {
    return isEmptyValue(field.value.value)
  })

  const emptyText = computed(() => {
    return unref(readonlyEmptyText) ?? '-'
  })

  const readonlyText = computed(() => {
    return empty.value
      ? emptyText.value
      : field.value.value
  })

  return {
    empty,
    readonly,
    emptyText,
    readonlyText,
    value: field.value,
  }
}
