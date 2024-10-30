import type { TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { VNodeChild } from 'vue'
import type { ProDataTableBaseColumn, ProDataTableColumnGroup, ProDataTableExpandColumn, ProDataTableIndexColumn } from '../data-table/types'
import type { ProFieldProps } from '../form'

interface BaseColumnRenderHelpers {
  /**
   * 当前行是否在编辑状态
   */
  editable: boolean
}

export interface ProEditDataTableBaseColumn<RowData = any> extends Omit<ProDataTableBaseColumn<RowData>, 'render'> {
  /**
   * 传递给 ProField 组件的 props，自定义渲染时无效
   */
  proFieldProps?: ProFieldProps | ((rowData: RowData, rowIndex: number) => ProFieldProps)
  /**
   * 重写 render 函数
   */
  render?: (rowData: RowData, rowIndex: number, helpers: BaseColumnRenderHelpers) => VNodeChild
}

export type ProEditDataTableColumn<RowData = any> =
  | TableSelectionColumn<RowData>
  | ProDataTableIndexColumn<RowData>
  | ProDataTableColumnGroup<RowData>
  | ProDataTableExpandColumn<RowData>
  | ProEditDataTableBaseColumn<RowData>

export type ProEditDataTableColumns<RowData = any> = ProEditDataTableColumn<RowData>[]
