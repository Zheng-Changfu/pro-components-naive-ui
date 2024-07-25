import { isBoolean } from 'lodash-es'
import type { ComputedRef } from 'vue'
import { computed, inject, unref } from 'vue'
import { proFormContextKey } from '../context'

export interface UseFormItemReadonlyOptions {
  readonly: ComputedRef<boolean | undefined>
}
export function useFormItemReadonly(options: UseFormItemReadonlyOptions) {
  const { readonly: formReadonlyRef } = inject(proFormContextKey)!

  return computed(() => {
    const propReadonly = options.readonly.value
    const formReadonly = unref(formReadonlyRef)
    if (isBoolean(propReadonly)) {
      return propReadonly
    }
    if (isBoolean(formReadonly)) {
      return formReadonly
    }
    return false
  })
}
