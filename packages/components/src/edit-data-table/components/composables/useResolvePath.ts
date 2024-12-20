import { createArrayField, providePathIndex } from 'pro-composables'
import { computed, watch } from 'vue'

interface UseProvidePathOptions {
  rowIndex: number
  childrenKey: string
  row: Record<string, any>
}
export function useResolvePath(options: UseProvidePathOptions) {
  watch(() => options.row, (row) => {
    if (row.__parent__) {
      createArrayField({
        path: computed(() => {
          return options.childrenKey
        }),
      })
    }
  }, {
    once: true,
    immediate: true,
  })
  console.log(options.rowIndex)
  providePathIndex(computed(() => options.rowIndex))
}
