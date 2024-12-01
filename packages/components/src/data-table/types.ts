import type { TableBaseColumn, TableColumnGroup, TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { Merge, Paths } from 'type-fest'
import type { VNodeChild } from 'vue'

type RowPath<RowData> = Paths<RowData> | ({} & string)

export interface ProDataTableBaseColumn<RowData = any> extends Omit<TableBaseColumn<RowData>, 'key'> {
  /**
   * naive-ui key
   */
  key?: string | number
  /**
   * 显示在标题右边的提示
   */
  tooltip?: string | string[]
  /**
   * 同 naive-ui key，工程化统一
   */
  path?: RowPath<RowData>
}

export interface ProDataTableColumnGroup<RowData = any> extends Omit<
  TableColumnGroup<RowData>,
  | 'key' | 'children'
> {
  key?: string | number
  path?: RowPath<RowData>
  tooltip?: string | string[]
  children: Array<Merge<
    ProDataTableBaseColumn<RowData>,
    { children?: ProDataTableColumnGroup<RowData>['children'] }
  >>
}

export interface ProDataTableIndexColumn<RowData = any> extends Omit<
  ProDataTableBaseColumn<RowData>,
  | 'key'
  | 'type'
  | 'path'
  | 'render'
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
