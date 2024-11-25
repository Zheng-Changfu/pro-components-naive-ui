import type { DataTableProps } from 'naive-ui'
import type { TableBaseColumn, TableColumnGroup, TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { Merge, Paths } from 'type-fest'
import type { VNodeChild } from 'vue'
import type { ProFieldColumn } from '../form'

interface ProDataTableBaseColumnProps<RowData = any> extends TableBaseColumn<RowData> {
  /**
   * 显示在列右边的提示
   */
  tooltip?: string | string[]
}

type RowIndex = number

export type ProDataTableBaseColumn<RowData = any> = ProFieldColumn<
  RowData,
  ProDataTableBaseColumnProps,
  [RowData, RowIndex],
  [RowData, RowIndex]
>

export interface ProDataTableColumnGroup<RowData = any> extends Omit<
  TableColumnGroup<RowData>,
  | 'key' | 'children'
> {
  key?: Paths<RowData>
  path?: Paths<RowData>
  tooltip?: string | string[]
  children: Array<Merge<
    ProDataTableBaseColumn<RowData>,
    { children?: ProDataTableColumnGroup<RowData>['children'] }
  >>
}

export interface ProDataTableIndexColumn<RowData = any> extends Omit<
  ProDataTableBaseColumn<RowData>,
  | 'key'
  | 'path'
  | 'type'
  | 'render'
  | 'valueType'
  | 'fieldProps'
  | 'fieldSlots'
  | 'proFieldProps'
> {
  /**
   * 序号列
   */
  type: 'index'
  /**
   * 自定义序号内容
   * @param index 序号
   * @param rowData 行数据
   * @param rowIndex 行索引
   */
  render?: (index: number, rowData: RowData, rowIndex: number) => VNodeChild
}

export interface ProDataTableExpandColumn<RowData = any> extends TableExpandColumn<RowData> {
  tooltip?: string | string[]
}

export type ProDataTableColumn<RowData = any> =
  | TableSelectionColumn<RowData>
  | ProDataTableBaseColumn<RowData>
  | ProDataTableIndexColumn<RowData>
  | ProDataTableColumnGroup<RowData>
  | ProDataTableExpandColumn<RowData>

export type ProDataTableColumns<RowData = any> = ProDataTableColumn<RowData>[]

export interface ToolbarDensitySetting {
  /**
   * 自定义渲染 icon
   */
  renderIcon?: () => VNodeChild
  /**
   * 默认选中的大小
   */
  default?: NonNullable<DataTableProps['size']>
}

export interface ToolbarColumnSetting {
  /**
   * 是否可以拖拽
   */
  draggable?: boolean
  /**
   * 是否显示 checkbox
   */
  checkable?: boolean
  /**
   * 是否显示重置按钮
   */
  resetButton?: boolean
  /**
   * 是否显示序号列
   */
  indexColummn?: boolean
  /**
   * 自定义渲染 icon
   */
  renderIcon?: () => VNodeChild
}

export interface ProDataTableToolbarSetting {
  density?: false | ToolbarDensitySetting
  columnSetting?: false | ToolbarColumnSetting
}
