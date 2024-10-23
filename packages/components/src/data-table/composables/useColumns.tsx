import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableBaseColumn, ProDataTableColumn } from '../types'
import { mapTree } from 'pro-components-hooks'
import { computed, watchEffect } from 'vue'
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
    createDragSortColumn,
    createValueTypeColumn,
    createTooltipTitleRender,
  } = useColumnRenderer({ columns, pagination, dragHandleId })

  function isDragSortColumn(column: ProDataTableBaseColumn) {
    const { dragSortKey } = props.value
    const columnKey = column.path ?? column.key
    return !!dragSortKey && dragSortKey === columnKey
  }

  function resolveColumns(columns: ProDataTableColumn[]) {
    return mapTree(columns, (item) => {
      const {
        key,
        path,
        type,
        title,
        tooltip,
        valueType,
        fieldProps,
        fieldSlots,
        ...rest
      } = item as any

      if (type === 'index') {
        return createIndexColumn(item as any)
      }
      if (valueType) {
        return createValueTypeColumn(item as any)
      }
      if (isDragSortColumn(item as any)) {
        return createDragSortColumn(item as any)
      }
      return {
        type,
        ...rest,
        key: path ?? key,
        title: createTooltipTitleRender(title, tooltip),
      }
    }, (props.value.childrenKey ?? 'children') as any)
  }

  function getColumns() {
    return columns.value
  }

  function getCacheColumns() {
    return cacheColumns
  }

  function setCacheColumns(values: ProDataTableColumn[] | DataTableColumn[]) {
    cacheColumns = resolveColumns(values as ProDataTableColumn[])
  }

  function setColumns(values: ProDataTableColumn[] | DataTableColumn[]) {
    columns.value = resolveColumns(values as ProDataTableColumn[])
  }

  watchEffect(() => {
    const values = props.value.columns ?? []
    columns.value = resolveColumns(values)
    cacheColumns = columns.value
  })

  return {
    setColumns,
    getColumns,
    getCacheColumns,
    setCacheColumns,
    columns: computed(() => columns.value),
  }
}
