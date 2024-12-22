import { isNil } from 'lodash-es'
import { provideFieldIndex } from 'pro-composables'
import { computed } from 'vue'
import { LEVELINDEX, PARENT } from '../const'

interface UseProvidePathOptions {
  rowIndex: number
  childrenKey: string
  row: Record<string, any>
  columnKey?: string | number
}
export function useResolvePath(options: UseProvidePathOptions) {
  const path = computed(() => {
    const {
      row,
      columnKey,
      childrenKey,
    } = options

    if (isNil(columnKey)) {
      return undefined
    }
    if (row[PARENT]) {
      // 树形表格
      return `${childrenKey}[${row[LEVELINDEX]}].${columnKey}`
    }
    return `${columnKey}`
  })

  provideFieldIndex(computed(() => options.rowIndex))

  return {
    path,
  }
}
