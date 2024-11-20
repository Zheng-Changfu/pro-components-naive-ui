import type { DataTableColumn, DataTableInst, DataTableProps, PaginationProps } from 'naive-ui'
import type { ProSearchFormInst } from './components/search-form'
import type { ProDataTableColumn } from './types'

export interface ProDataTableInst<RowData = any, SearchValues = any> extends DataTableInst {
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
   * 设置表格列
   */
  setColumns: (columns: ProDataTableColumn[] | DataTableColumn[]) => void
  /**
   * 设置表格缓存列（内部使用）
   */
  setCacheColumns: (columns: ProDataTableColumn[] | DataTableColumn[]) => void
  /**
   * 获取表格大小
   */
  getTableSize: () => DataTableProps['size'] & {}
  /**
   * 获取表格的所有列
   */
  getColumns: () => DataTableColumn[]
  /**
   * 获取缓存的列（内部使用）
   */
  getCacheColumns: () => DataTableColumn[]
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
  getSearchFormInst: () => ProSearchFormInst<SearchValues>
}
