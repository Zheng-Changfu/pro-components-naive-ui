import type { ToRef } from 'vue'
import { providePath, providePathIndex, stringifyPath, useInjectListField } from 'pro-composables'
import { computed } from 'vue'

export function useProvidePath(index: ToRef<number>) {
  const parent = useInjectListField()!

  const path = computed(() => {
    return [
      ...parent.path.value, // list path
      String(index.value),
    ]
  })

  const rowPath = computed(() => {
    return stringifyPath(path.value)
  })

  providePath(path)
  providePathIndex(index)
  return {
    path,
    rowPath,
  }
}
