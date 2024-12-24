import type { ProDataTableColumn } from '../../../data-table'
import type { InternalEditDataTableProps } from '../../props'
import type { ProEditDataTableColumns } from '../../types'
import { get, has, isNil } from 'lodash-es'
import { mapTree } from 'pro-composables'
import { computed } from 'vue'
import { def } from '../../../_utils/def'
import { resolveRowKey } from '../../../data-table/utils/resolveRowKey'
import { LEVELINDEX, PARENT } from '../const'
import EditDataTableCell from '../edit-data-table-cell'
import { isProEditDataTableBaseColumn } from '../utils/column'

export function useColumns(props: InternalEditDataTableProps) {
  function convertProEditColumnsToProColumns(columns: ProEditDataTableColumns): ProDataTableColumn[] {
    const childrenKey = props.childrenKey ?? 'children'
    const dragSortColumnPath = props.dragSortOptions?.columnPath
    return mapTree(columns, (column) => {
      if (!isProEditDataTableBaseColumn(column, childrenKey, dragSortColumnPath)) {
        return column
      }
      const columnKey = column.path ?? column.key
      return {
        ...column,
        render: (row: any, rowIndex: number) => {
          const rowKey = resolveRowKey(row, props.rowKey)
          /**
           *  展开行不计入 render 的 rowIndex 内
           */
          if (!has(row, LEVELINDEX)) {
            def(row, LEVELINDEX, rowIndex)
          }
          if (!isNil(rowKey)) {
            const children = get(row, childrenKey, [])
            children.forEach((item: any, levelIndex: number) => {
              def(item, PARENT, row)
              def(item, LEVELINDEX, levelIndex)
            })
          }
          return (
            <EditDataTableCell
              row={row}
              column={column}
              rowKey={rowKey}
              rowIndex={rowIndex}
              columnKey={columnKey}
              childrenKey={childrenKey}
            />
          )
        },
      }
    }, childrenKey as any)
  }

  const finalColumns = computed(() => {
    return convertProEditColumnsToProColumns(props.columns ?? [])
  })

  return {
    columns: finalColumns,
  }
}
