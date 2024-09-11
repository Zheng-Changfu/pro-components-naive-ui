import { omit } from 'lodash-es'
import { computed } from 'vue'

export function useOmitProps<T extends object, K extends keyof T>(props: T, excludeProps: Record<K, any>) {
  const excludePropKeys = Object.keys(excludeProps)
  return computed(() => {
    return omit(props, excludePropKeys) as Partial<Omit<T, K>>
  })
}
