import type { ToRef } from 'vue'
import { providePathContext, providePathIndexContext, useInjectListFieldContext } from 'pro-composables'

export function useProvidePath(rowIndex: ToRef<number>) {
  const parent = useInjectListFieldContext()!

  const path = computed(() => {
    return [
      ...parent.path.value, // list path
      String(rowIndex.value),
    ]
  })

  providePathContext(path)
  providePathIndexContext(rowIndex)
  return {
    path,
  }
}
