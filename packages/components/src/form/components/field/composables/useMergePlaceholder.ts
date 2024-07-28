import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { BaseField } from 'pro-components-hooks'
import { useInjectGlobalConfig } from '../../../../config-provider'
import { fieldExtraKey } from '../keys'

export interface UseMergePlaceholderOptions {
  field: BaseField
  placeholder: ComputedRef<string | string[] | undefined>
}
export function useMergePlaceholder(options: UseMergePlaceholderOptions) {
  const { field, placeholder } = options
  const { renderPlaceholder } = useInjectGlobalConfig().proForm

  return computed(() => {
    const propPlaceholder = placeholder.value
    if (propPlaceholder !== undefined) {
      return propPlaceholder
    }
    if (renderPlaceholder !== undefined) {
      return renderPlaceholder(field[fieldExtraKey])
    }
  })
}
