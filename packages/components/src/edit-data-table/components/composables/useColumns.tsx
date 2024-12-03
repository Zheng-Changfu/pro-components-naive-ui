import type { ProDataTableColumn } from '../../../data-table'
import type { InternalEditDataTableProps } from '../../props'
import type { ProEditDataTableColumns } from '../../types'
import { mapTree } from 'pro-composables'
import { computed } from 'vue'
import { isDragSortColumn } from '../../../data-table/utils/column'
import EditDataTableCell from '../edit-data-table-cell'
import { isProEditDataTableBaseColumn } from '../utils/column'

export function useColumns(props: InternalEditDataTableProps) {
  function convertProEditColumnsToProColumns(columns: ProEditDataTableColumns): ProDataTableColumn[] {
    return mapTree(columns, (column) => {
      if (isDragSortColumn(column, props.dragSortKey) || !isProEditDataTableBaseColumn(column)) {
        return column
      }

      const columnKey = column.path ?? column.key
      return {
        ...column,
        render: (row: any, rowIndex: number) => {
          return (
            <EditDataTableCell
              row={row}
              column={column}
              rowIndex={rowIndex}
              columnKey={columnKey}
            />
          )
        },
      }
    }, (props.childrenKey ?? 'children') as any)
  }

  const finalColumns = computed(() => {
    return convertProEditColumnsToProColumns(props.columns ?? [])
  })

  return {
    columns: finalColumns,
  }
}
