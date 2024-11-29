import type { FieldExtraInfo } from '../keys'
import { useInjectField } from 'pro-composables'
import { computed, unref } from 'vue'
import { useInjectProFormConfig } from '../../../context'
import { fieldExtraKey } from '../keys'
import { isEmptyValue } from '../utils/valueUtil'

export function useReadonlyHelpers() {
  const field = useInjectField()!
  const fieldExtraInfo = field[fieldExtraKey] as FieldExtraInfo

  const {
    readonlyEmptyText,
  } = useInjectProFormConfig()

  const {
    readonly,
  } = fieldExtraInfo

  const empty = computed(() => {
    return isEmptyValue(field.value.value)
  })

  const readonlyText = computed(() => {
    return empty.value
      ? unref(readonlyEmptyText)
      : field.value.value
  })

  return {
    empty,
    readonly,
    readonlyText,
    value: field.value,
    emptyText: readonlyEmptyText,
  }
}
