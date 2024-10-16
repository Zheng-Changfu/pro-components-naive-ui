import type { DataTableColumn, DataTableInst, DataTableProps, PaginationProps } from 'naive-ui'
import type { ProSearchFormInst } from './components/search-form'

export interface ProDataTableInst<RowData = any> extends DataTableInst {
  /**
   * 重新加载表格
   */
  reload: (params: Record<string, any>) => Promise<any>
  /**
   * 设置分页信息
   */
  setPagination: (props: PaginationProps | false) => void
  /**
   * 设置表格数据
   */
  setTableData: (data: RowData[]) => void
  /**
   * 设置表格大小
   */
  setTableSize: (size: DataTableProps['size'] & {}) => void
  /**
   * 设置表格 loading
   */
  setLoading: (loading: boolean) => void
  /**
   * 匹配符合要求的列
   * @param match 匹配列的回调
   */
  matchColumns: (
    match: (column: DataTableColumn, index: number) => boolean
  ) => DataTableColumn[]
  /**
   * 移动列
   * @param from 当前索引
   * @param toKey 目标索引
   */
  moveColumn: (from: number, to: number) => void
  /**
   * 获取表格大小
   */
  getTableSize: () => DataTableProps['size'] & {}
  /**
   * 获取表格的所有列
   */
  getColumns: () => DataTableColumn[]
  /**
   * 获取 row-key 对应行信息的映射，可能有 bug，node.children = xxx
   */
  getRowKeyToRowMap: () => Map<string, RowData>
  /**
   * 获取分页信息
   */
  getPagination: () => PaginationProps | false
  /**
   * 获取表格数据
   */
  getTableData: () => RowData[]
  /**
   * 获取查询表单实例
   */
  getSearchFormInst: () => ProSearchFormInst
}
