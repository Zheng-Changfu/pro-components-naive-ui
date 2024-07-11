import { isBoolean } from 'lodash-es'
import type { ComputedRef } from 'vue'
import { computed, inject, unref } from 'vue'
import { proFormReadonlyContextKey } from '../context'

export interface UseFormItemReadonlyOptions {
  readonly: ComputedRef<boolean | undefined>
}
export function useFormItemReadonly(options: UseFormItemReadonlyOptions) {
  const formReadonlyRef = inject(proFormReadonlyContextKey)

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
