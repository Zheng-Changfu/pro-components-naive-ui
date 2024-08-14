import { useInjectFieldContext } from 'pro-components-hooks'
import { computed } from 'vue'
import type { FieldExtraInfo } from '../keys'
import { fieldExtraKey } from '../keys'
import { useInjectGlobalConfig } from '../../../../config-provider'
import { isEmptyValue } from '../utils/valueUtil'

export function useReadonlyHelpers() {
  const field = useInjectFieldContext()!
  const fieldExtraInfo = field[fieldExtraKey] as FieldExtraInfo
  const { readonlyEmptyText } = useInjectGlobalConfig().proForm

  const {
    readonly,
    valueType,
  } = fieldExtraInfo

  const empty = computed(() => {
    return isEmptyValue(field.value.value)
  })

  const emptyText = computed(() => {
    return readonlyEmptyText ?? '-'
  })

  const readonlyText = computed(() => {
    return empty.value
      ? emptyText.value
      : field.value.value
  })

  return {
    empty,
    readonly,
    valueType,
    emptyText,
    readonlyText,
    value: field.value,
  }
}
