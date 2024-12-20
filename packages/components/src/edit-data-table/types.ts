import type { RowKey, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { Simplify } from 'type-fest'
import type { VNodeChild } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProDataTableBaseColumn, ProDataTableColumnGroup, ProDataTableExpandColumn, ProDataTableIndexColumn } from '../data-table/types'
import type { ProFieldColumn } from '../form'
import type { ProEditDataTableInst } from './inst'

interface BaseColumnRenderAction<RowData = any> extends ProEditDataTableInst<RowData> {
  /**
   * 当前行是否在编辑状态
   */
  editable: boolean
}

type RowIndex = number

export interface ProEditDataTableBaseColumnProps<RowData = any> extends Omit<ProDataTableBaseColumn<RowData>, 'render'> {
  /**
   * 重写 render 函数
   */
  render?: (rowData: RowData, rowIndex: number, action: Simplify<BaseColumnRenderAction<RowData>>) => VNodeChild
}

export type ProEditDataTableBaseColumn<RowData = any> = ProFieldColumn<
  RowData,
  ProEditDataTableBaseColumnProps<RowData>,
  [RowData, RowIndex],
  [RowData, RowIndex]
>

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
  beforeAddRow?: (opt: { index: number, insertIndex: number, total: number }) => boolean | Promise<boolean>
  /**
   * 添加行之后触发的回调
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  afterAddRow?: (opt: { index: number, insertIndex: number, total: number }) => void
}

export interface RecordCreatorProps extends ProButtonProps {
  /**
   * 新增一行的默认值,要写 key
   */
  record?: () => Record<string, any>
  /**
   * 要增加到哪个节点下，一般用于多重嵌套表格
   */
  parentRowKey?: RowKey | (() => RowKey)
}
