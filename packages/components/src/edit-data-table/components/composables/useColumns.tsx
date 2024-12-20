import type { ProDataTableColumn } from '../../../data-table'
import type { InternalEditDataTableProps } from '../../props'
import type { ProEditDataTableColumns } from '../../types'
import { get, has, isArray, isNil } from 'lodash-es'
import { mapTree } from 'pro-composables'
import { computed } from 'vue'
import { def } from '../../../_utils/def'
import { resolveRowKey } from '../../../data-table/utils/resolveRowKey'
import EditDataTableCell from '../edit-data-table-cell'
import { isProEditDataTableBaseColumn } from '../utils/column'

export function useColumns(props: InternalEditDataTableProps) {
  function convertProEditColumnsToProColumns(columns: ProEditDataTableColumns): ProDataTableColumn[] {
    const childrenKey = props.childrenKey ?? 'children'
    return mapTree(columns, (column) => {
      // 这里有bug，需要修复
      if (!isProEditDataTableBaseColumn(column)) {
        return column
      }

      const columnKey = column.path ?? column.key
      return {
        ...column,
        render: (row: any, rowIndex: number) => {
          const rowKey = resolveRowKey(row, props.rowKey)

          if (!isNil(rowKey)) {
            const children = get(row, childrenKey, [])
            children.forEach((item: any) => {
              def(item, '__parent__', row)
            })
          }

          // const isExpandedRow = isArray() || (has(row, 'isLeaf') && !row.isLeaf) // 是否是展开行
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
