import type { ToRef } from 'vue'
import { provideFieldIndex, stringifyPath, useInjectField } from 'pro-composables'
import { computed } from 'vue'

export function useResolvePath(index: ToRef<number>) {
  const parent = useInjectField(true)!

  const path = computed(() => {
    return [
      ...parent.path.value,
      String(index.value),
    ]
  })

  const rowPath = computed(() => {
    return stringifyPath(path.value)
  })

  provideFieldIndex(index)
  return {
    path,
    rowPath,
  }
}
