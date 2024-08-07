import { useInjectFieldContext } from 'pro-components-hooks'
import { computed } from 'vue'
import type { FieldExtraInfo } from '../keys'
import { fieldExtraKey } from '../keys'
import { useInjectGlobalConfig } from '../../../../config-provider'
import { isEmptyValue } from '../utils/valueUtil'

export function useReadonlyHelpers() {
  const field = useInjectFieldContext()!
  const fieldExtraInfo = field[fieldExtraKey] as FieldExtraInfo
  const { renderReadonlyEmpty } = useInjectGlobalConfig().proForm

  const {
    value,
    readonly,
    valueType,
  } = fieldExtraInfo

  const empty = computed(() => {
    return isEmptyValue(value.value)
  })

  const emptyText = computed(() => {
    if (renderReadonlyEmpty) {
      return renderReadonlyEmpty(fieldExtraInfo)
    }
    return '-'
  })

  const readonlyText = computed(() => {
    return empty.value
      ? emptyText.value
      : value.value
  })

  return {
    empty,
    value,
    readonly,
    valueType,
    emptyText,
    readonlyText,
  }
}
