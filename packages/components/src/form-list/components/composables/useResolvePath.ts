import type { ToRef } from 'vue'
import { providePathIndex, stringifyPath, useInjectListField } from 'pro-composables'
import { computed } from 'vue'

export function useResolvePath(index: ToRef<number>) {
  const parent = useInjectListField()!

  const path = computed(() => {
    return [
      ...parent.path.value,
      String(index.value),
    ]
  })

  const rowPath = computed(() => {
    return stringifyPath(path.value)
  })

  providePathIndex(index)
  return {
    path,
    rowPath,
  }
}
