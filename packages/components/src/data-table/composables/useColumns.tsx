import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableBaseColumn, ProDataTableColumn } from '../types'
import { mapTree } from 'pro-components-hooks'
import { computed, watchEffect } from 'vue'
import { isExpandColumn, isGroupColumn, isIndexColumn, isSelectionColumn } from '../utils/column'
import { useColumnRenderer } from './useColumnRenderer'

interface UseColumnsOptions {
  dragHandleId: string
  pagination: ComputedRef<PaginationProps | false>
}
export function useColumns(props: ComputedRef<ProDataTableProps>, options: UseColumnsOptions) {
  let cacheColumns: DataTableColumn[] = []
  const columns = ref<DataTableColumn[]>([])

  const {
    pagination,
    dragHandleId,
  } = options

  const {
    createIndexColumn,
    renderTooltipTitle,
    createDragSortColumn,
    createValueTypeColumn,
  } = useColumnRenderer({ columns, pagination, dragHandleId })

  function isDragSortColumn(column: ProDataTableBaseColumn) {
    const { dragSortKey } = props.value
    const columnKey = column.path ?? column.key
    return !!dragSortKey && dragSortKey === columnKey
  }

  function convertProColumnToColumn(columns: ProDataTableColumn[]): DataTableColumn[] {
    const childrenKey = props.value.childrenKey ?? 'children'
    return mapTree(columns, (column) => {
      if (isIndexColumn(column)) {
        return createIndexColumn(column)
      }
      if (isSelectionColumn(column)) {
        return column
      }
      if (isExpandColumn(column)) {
        const { title, tooltip, ...rest } = column
        return {
          ...rest,
          title: renderTooltipTitle(title, tooltip),
        }
      }
      if (isGroupColumn(column)) {
        const { title, tooltip, path, key, ...rest } = column
        return {
          ...rest,
          key: path ?? key ?? '',
          title: renderTooltipTitle(title, tooltip),
        }
      }
      if (isDragSortColumn(column)) {
        return createDragSortColumn(column)
      }
      return createValueTypeColumn(column)
    }, childrenKey as any)
  }

  function getColumns() {
    return columns.value
  }

  function getCacheColumns() {
    return cacheColumns
  }

  function setCacheColumns(values: ProDataTableColumn[] | DataTableColumn[]) {
    cacheColumns = convertProColumnToColumn(values as ProDataTableColumn[])
  }

  function setColumns(values: ProDataTableColumn[] | DataTableColumn[]) {
    columns.value = convertProColumnToColumn(values as ProDataTableColumn[])
  }

  watchEffect(() => {
    const values = props.value.columns ?? []
    cacheColumns = columns.value = convertProColumnToColumn(values)
  })

  return {
    setColumns,
    getColumns,
    getCacheColumns,
    setCacheColumns,
    columns: computed(() => columns.value),
  }
}
