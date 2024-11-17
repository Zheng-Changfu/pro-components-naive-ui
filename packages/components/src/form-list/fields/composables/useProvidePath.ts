import type { ToRef } from 'vue'
import { providePathContext, providePathIndexContext, useInjectListFieldContext } from 'pro-composables'
import { computed } from 'vue'

export function useProvidePath(index: ToRef<number>) {
  const parent = useInjectListFieldContext()!

  const path = computed(() => {
    return [
      ...parent.path.value, // list path
      String(index.value),
    ]
  })

  providePathContext(path)
  providePathIndexContext(index)
  return {
    path,
  }
}
