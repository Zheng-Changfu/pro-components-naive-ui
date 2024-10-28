import type { ToRef } from 'vue'
import { providePathContext, providePathIndexContext, useInjectParentFieldContext } from 'pro-components-hooks'

export function useProvidePath(rowIndex: ToRef<number>) {
  const parent = useInjectParentFieldContext()!

  const path = computed(() => {
    return [
      ...parent.path.value, // list path
      rowIndex.value,
    ]
  })

  providePathContext(path)
  providePathIndexContext(rowIndex)
  return {
    path,
  }
}
