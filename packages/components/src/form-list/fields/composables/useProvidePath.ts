import type { ToRef } from 'vue'
import { providePathContext, providePathIndexContext, useInjectParentFieldContext } from 'pro-components-hooks'
import { computed } from 'vue'

export function useProvidePath(index: ToRef<number>) {
  const parent = useInjectParentFieldContext()!

  const path = computed(() => {
    return [
      ...parent.path.value, // list path
      index.value,
    ]
  })

  providePathContext(path)
  providePathIndexContext(index)
  return {
    path,
  }
}
