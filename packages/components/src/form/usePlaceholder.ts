import { type ComputedRef, computed } from 'vue'
import { isUndefined } from 'lodash-es'
import { useInjectGlobalConfigContext } from '../config-provider'
import type { ProComponentConfig } from './field'

export function usePlaceholder<T = any>(placeholder: ComputedRef<T>, options: ProComponentConfig) {
  const { proForm } = useInjectGlobalConfigContext()
  return computed<T>(() => {
    const ph = placeholder.value
    return !isUndefined(ph)
      ? ph
      : proForm.placeholderRender?.(options)
  })
}
