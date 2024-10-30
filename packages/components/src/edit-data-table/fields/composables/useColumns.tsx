import type { ProDataTableColumn } from '../../../data-table'
import type { ProEditDataTableColumns } from '../../types'
import type { FieldDataTableProps } from '../field-data-table'
import { mapTree } from 'pro-components-hooks'
import { ref, watchEffect } from 'vue'
import { isDragSortColumn } from '../../../data-table/utils/column'
import FieldDataTableCell from '../field-data-table-cell'
import { isProEditDataTableBaseColumn } from '../utils/column'

export function useColumns(props: FieldDataTableProps) {
  const columns = ref<ProDataTableColumn[]>([])

  function convertProEditColumnsToProColumns(columns: ProEditDataTableColumns): ProDataTableColumn[] {
    return mapTree(columns, (column) => {
      if (
        !isProEditDataTableBaseColumn(column)
        || isDragSortColumn(column, props.dragSortKey)
      ) {
        return column
      }

      const columnKey = column.path ?? column.key
      return {
        ...column,
        path: column.path ?? column.key,
        render: (row: any, rowIndex: number) => {
          return (
            <FieldDataTableCell
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

  watchEffect(() => {
    const values = props.columns ?? []
    columns.value = convertProEditColumnsToProColumns(values)
  })

  return {
    columns,
  }
}
