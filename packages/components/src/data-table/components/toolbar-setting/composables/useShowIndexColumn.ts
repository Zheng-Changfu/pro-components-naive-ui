import type { DataTableColumn } from 'naive-ui'
import { ref, watchEffect } from 'vue'
import { indexColumnKey } from '../../../composables/useColumnRenderer'
import { useInjectProDataTableInst } from '../../../context'

export function useShowIndexColumn() {
  const showIndexColumn = ref(true)

  const {
    setColumns,
    getColumns,
  } = useInjectProDataTableInst()!

  function findSelectionOrExpandColumnLastIndex(columns: DataTableColumn[]) {
    let index = -1
    for (let i = columns.length - 1; i >= 0; i--) {
      if (['selection', 'expand'].includes(columns[i].type as any)) {
        index = i
        break
      }
    }
    return index
  }

  function restore() {
    showIndexColumn.value = true
  }

  watchEffect(() => {
    const columns = [...getColumns()]
    const indexColumnIndex = columns.findIndex(column => (column as any).key === indexColumnKey)
    if (showIndexColumn.value) {
      if (!~indexColumnIndex) {
        // 序号列不存在,插入序号列，排在 selection 和 expand 列后面
        const selectionOrExpandColumnLastIndex = findSelectionOrExpandColumnLastIndex(columns)
        const insertIndex = selectionOrExpandColumnLastIndex === -1 ? 0 : selectionOrExpandColumnLastIndex + 1
        columns.splice(insertIndex, 0, { type: 'index' } as any)
        setColumns(columns)
      }
    }
    else {
      if (~indexColumnIndex) {
        // 序号列存在
        columns.splice(indexColumnIndex, 1)
        setColumns(columns)
      }
    }
  })

  return {
    restore,
    showIndexColumn,
  }
}
