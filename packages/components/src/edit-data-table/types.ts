import type { TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { VNodeChild } from 'vue'
import type { ProDataTableBaseColumn, ProDataTableColumnGroup, ProDataTableExpandColumn, ProDataTableIndexColumn } from '../data-table/types'
import type { ProFieldProps } from '../form'
import type { ProEditDataTableInst } from './inst'

interface BaseColumnRenderAction<RowData = any> extends ProEditDataTableInst<RowData> {
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
  render?: (rowData: RowData, rowIndex: number, action: BaseColumnRenderAction<RowData>) => VNodeChild
}

export type ProEditDataTableColumn<RowData = any> =
  | TableSelectionColumn<RowData>
  | ProDataTableIndexColumn<RowData>
  | ProDataTableColumnGroup<RowData>
  | ProDataTableExpandColumn<RowData>
  | ProEditDataTableBaseColumn<RowData>

export type ProEditDataTableColumns<RowData = any> = ProEditDataTableColumn<RowData>[]

export interface ActionGuard {
  /**
   * 添加行之前触发的回调，可以阻止添加
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  beforeAddRow: (opt: { index: number, insertIndex: number, total: number }) => boolean | Promise<boolean>
  /**
   * 添加行之后触发的回调
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  afterAddRow: (opt: { index: number, insertIndex: number, total: number }) => void
}
