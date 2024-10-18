import type { DataTableColumn, PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableColumn, ProTableBaseColumn } from '../types'
import { watchImmediate } from '@vueuse/core'
import { mapTree } from 'pro-components-hooks'
import { computed } from 'vue'
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
  } = useColumnRenderer({ columns, pagination, dragHandleId })

  function isDragSortColumn(column: ProTableBaseColumn) {
    const { dragSortKey } = props.value
    const columnKey = column.path ?? column.key
    return !!dragSortKey && dragSortKey === columnKey
  }

  watchImmediate(
    () => props.value.columns ?? [],
    (v) => {
      columns.value = resolveColumns(v)
      cacheColumns = columns.value
    },
  )

  function resolveColumns(columns: ProDataTableColumn[]) {
    return mapTree(columns, (item) => {
      const {
        key,
        type,
        path,
        fieldProps,
        fieldSlots,
        valueType,
        ...rest
      } = item as any

      if (type === 'index') {
        return createIndexColumn(rest)
      }
      if (valueType) {
        return createValueTypeColumn(rest)
      }
      if (isDragSortColumn(item as any)) {
        return createDragSortColumn(rest)
      }
      return {
        type,
        ...rest,
        key: path ?? key,
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

  return {
    setColumns,
    getColumns,
    getCacheColumns,
    setCacheColumns,
    columns: computed(() => columns.value),
  }
}
