import { type ComputedRef, computed, inject, unref } from 'vue'
import { proFormContextKey } from '../../../context'

export interface UseMergeReadonlyOptions {
  readonly: ComputedRef<boolean | undefined>
}
export function useMergeReadonly(options: UseMergeReadonlyOptions) {
  const { readonly: formReadonlyRef } = inject(proFormContextKey)!

  return computed(() => {
    const propReadonly = options.readonly.value
    const formReadonly = unref(formReadonlyRef)
    if (propReadonly !== undefined) {
      return !!propReadonly
    }
    if (propReadonly !== undefined) {
      return !!formReadonly
    }
    return false
  })
}
