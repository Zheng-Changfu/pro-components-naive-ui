import { omit } from 'lodash-es'
import { computed } from 'vue'

export function useOmitSlots<T extends object, K extends keyof T>(slots: T, excludeKeys: readonly K[]) {
  return computed(() => {
    return omit(slots, excludeKeys) as Partial<Omit<T, K>>
  })
}
