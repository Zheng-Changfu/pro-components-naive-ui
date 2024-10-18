import type { TableBaseColumn, TableColumnGroup, TableExpandColumn, TableSelectionColumn } from 'naive-ui/es/data-table/src/interface'
import type { ExtractObjectPath } from 'pro-components-hooks'
import type { VNodeChild } from 'vue'
import type { FieldValueType } from '../form'
import type { AnyFn } from '../types'

export interface ProTableBaseColumn<RowData = any> extends Omit<TableBaseColumn<RowData>, 'key'> {
  /**
   * naive-ui 需要的 key，这里只做了类型的处理
   */
  key?: ExtractObjectPath<RowData> | ({} & string)
  /**
   * 同 key，工程化统一
   */
  path: ExtractObjectPath<RowData> | ({} & string)
  /**
   * 组件映射，需要通过 `ProConfigProvider` 的 `valueTypeMap` 映射
   */
  valueType?: FieldValueType
  /**
   * 组件的 props，自定义渲染时无效
   */
  fieldProps?: Record<string, any> | ((rowData: RowData, rowIndex: number) => Record<string, any>)
  /**
   * 组件的 slots，自定义渲染时无效
   */
  fieldSlots?: Record<string, AnyFn>
}

interface ProTableColumnGroup<RowData = any> extends Omit<TableColumnGroup<RowData>, 'key' | 'children'> {
  key?: ExtractObjectPath<RowData> | ({} & string)
  path: ExtractObjectPath<RowData> | ({} & string)
  children: ProTableBaseColumn<RowData>[]
}

export interface TableIndexColumn<RowData = any> extends Omit<ProTableBaseColumn<RowData>, 'path' | 'key' | 'render' | 'type' | 'valueType' | 'fieldProps' | 'fieldSlots'> {
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

export type ProDataTableColumn<RowData = any> =
  | TableIndexColumn<RowData>
  | TableExpandColumn<RowData>
  | ProTableBaseColumn<RowData>
  | ProTableColumnGroup<RowData>
  | TableSelectionColumn<RowData>

export type ProDataTableColumns<RowData = any> = ProDataTableColumn<RowData>[]

export interface ProDataTableFieldSetting {
  /**
   * 页码字段
   * @default 'page'
   */
  pageField?: string
  /**
   * 分页大小字段
   * @default 'pageSize'
   */
  sizeField?: string
  /**
   * 数据字段
   * @default 'list'
   */
  listField?: string
  /**
   * 总数字段
   * @default 'total'
   */
  totalField?: string
}
