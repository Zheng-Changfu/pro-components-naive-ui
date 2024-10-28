import type { ProDataTableColumn } from '../../../data-table'
import type { ProEditDataTableColumn, ProEditDataTableColumns } from '../../types'
import type { FieldDataTableProps } from '../field-data-table'
import { mapTree } from 'pro-components-hooks'
import { ref, watchEffect } from 'vue'
import FieldDataTableCell from '../field-data-table-cell'

export function useColumns(props: FieldDataTableProps) {
  const columns = ref<ProDataTableColumn[]>([])

  function isSpecialColumn(column: ProEditDataTableColumn) {
    return ['index', 'expand', 'selection'].includes(column.type as string)
  }

  function resolveColumns(columns: ProEditDataTableColumns) {
    return mapTree(columns, (column: any) => {
      const columnKey = column.path ?? column.key
      return isSpecialColumn(column)
        ? column
        : {
            ...column,
            path: columnKey,
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
    columns.value = resolveColumns(values)
  })

  return {
    columns,
  }
}
