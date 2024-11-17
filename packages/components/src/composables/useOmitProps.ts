import type { Simplify } from 'type-fest'
import type { UnwrapRef } from 'vue'
import { omit } from 'lodash-es'
import { computed, unref } from 'vue'

export function useOmitProps<T extends object, K extends keyof UnwrapRef<T>>(props: T, excludeProps: Record<K, any>) {
  const excludePropKeys = Object.keys(excludeProps)
  return computed(() => {
    return omit(unref(props), excludePropKeys) as unknown as Simplify<Partial<Omit<UnwrapRef<T>, K>>>
  })
}
