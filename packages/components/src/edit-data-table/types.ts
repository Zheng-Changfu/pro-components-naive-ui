import type { TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { ProDataTableBaseColumn, ProDataTableColumnGroup, ProDataTableIndexColumn } from '../data-table/types'
import type { ProFieldProps } from '../form'

export interface ProEditDataTableBaseColumn<RowData = any> extends ProDataTableBaseColumn<RowData> {
  /**
   * 传递给 ProField 组件的 props，自定义渲染时无效
   */
  proFieldProps?: ProFieldProps | ((rowData: RowData, rowIndex: number) => ProFieldProps)
}

export type ProEditDataTableColumn<RowData = any> =
  | ProDataTableIndexColumn<RowData>
  | TableExpandColumn<RowData>
  | ProEditDataTableBaseColumn<RowData>
  | ProDataTableColumnGroup<RowData>
  | TableSelectionColumn<RowData>

export type ProEditDataTableColumns<RowData = any> = ProEditDataTableColumn<RowData>[]
