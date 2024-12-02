import type { FieldExtraInfo } from '../keys'
import { useInjectField } from 'pro-composables'
import { computed } from 'vue'
import { isEmptyValue } from '../../../../_utils/isEmptyValue'
import { useInjectGlobalConfig, useInjectWrappedIn } from '../../../../config-provider'
import { fieldExtraKey } from '../keys'

export function useReadonlyHelpers() {
  const field = useInjectField()!
  const wrappedIn = useInjectWrappedIn()
  const fieldExtraInfo = field[fieldExtraKey] as FieldExtraInfo

  const {
    mergedEmpty,
  } = useInjectGlobalConfig()

  const {
    readonly,
  } = fieldExtraInfo

  const empty = computed(() => {
    return isEmptyValue(field.value.value)
  })

  const emptyText = computed(() => {
    return mergedEmpty(wrappedIn)
  })

  const readonlyText = computed(() => {
    return empty.value
      ? emptyText
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
