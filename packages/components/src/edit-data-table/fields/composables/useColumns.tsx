import type { ProDataTableColumn } from '../../../data-table'
import type { ProEditDataTableColumns } from '../../types'
import type { EditDataTableProps } from '../edit-data-table'
import { watchImmediate } from '@vueuse/core'
import { mapTree } from 'pro-components-hooks'
import { ref } from 'vue'
import { isDragSortColumn } from '../../../data-table/utils/column'
import EditDataTableCell from '../edit-data-table-cell'
import { isProEditDataTableBaseColumn } from '../utils/column'

export function useColumns(props: EditDataTableProps) {
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

  watchImmediate(
    () => props.columns,
    (values) => {
      columns.value = convertProEditColumnsToProColumns(values ?? [])
    },
  )

  return {
    columns,
  }
}
