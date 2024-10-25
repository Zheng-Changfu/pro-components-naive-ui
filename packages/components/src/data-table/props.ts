import type { PaginationProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProCardProps } from '../card'
import type { RefreshOnWindowFocus } from '../composables/useFetchData'
import type { AnyFn } from '../types'
import type { ProSearchFormProps } from './components/search-form'
import type { ProDataTableColumns, ProDataTableFieldSetting, ProDataTableToolbarSetting } from './types'
import { dataTableProps } from 'naive-ui'

export const proDataTableExtendProps = {
  /**
   * 表格标题
   */
  title: String,
  /**
   * 提示文字，显示在标题的右边
   */
  tooltip: [String, Array] as PropType<string | string[]>,
  /**
   * 如果有单选、多选，是否可以点击行就选中
   */
  clickRowToSelect: Boolean,
  /**
   * 查询表单配置，false 不显示
   */
  searchForm: {
    type: [Boolean, Object] as PropType<false | ProSearchFormProps>,
    default: false,
  },
  /**
   * 查询区域卡片的配置
   */
  searchCardProps: Object as PropType<ProCardProps>,
  /**
   * 数据源分页相关字段配置
   */
  fieldSetting: Object as PropType<ProDataTableFieldSetting>,
  /**
   * 工具栏配置
   */
  toolbarSetting: [Boolean, Object] as PropType<boolean | ProDataTableToolbarSetting>,
  /**
   * 在请求完成后是否清除选中行
   */
  clearSelectOnRequested: {
    type: Boolean,
    default: true,
  },
  /**
   * 配置了这个参数，会在该 key 对应的行显示拖拽行的把手，允许拖拽排序
   */
  dragSortKey: String,
  /**
   * 拖拽排序完成回调
   * @param data 排序后的数据源
   * @param fromIndex 排序前的索引
   * @param toIndex 排序后的索引
   */
  onDragSortEnd: Function as PropType<(
    data: any[],
    fromIndex: number,
    toIndex: number,
  ) => Promise<void>>,
  /**
   * 是否手动调用 request，设置为 true 后不会调用 request
   */
  manual: Boolean,
  /**
   * 屏幕聚焦刷新请求
   */
  refreshOnWindowFocus: {
    type: [Boolean, Object] as PropType<RefreshOnWindowFocus>,
    default: undefined,
  },
  /**
   * 请求成功后可以转化数据，返回值为最终的结果值
   */
  transform: Function as AnyFn,
  /**
   * 请求函数
   */
  request: Function as AnyFn,
  /**
   * 请求失败触发的函数
   */
  onRequestError: Function as AnyFn,
  /**
   * 请求成功触发的函数
   */
  onRequestSuccess: Function as AnyFn,
  /**
   * 请求结束后触发的函数
   */
  onRequestComplete: Function as AnyFn,
} as const

export const proDataTableProps = {
  ...dataTableProps,
  ...proDataTableExtendProps,
  /**
   * 重写类型
   */
  columns: Array as PropType<ProDataTableColumns>,
  /**
   * 重写类型，支持字符串
   */
  rowKey: [String, Function] as PropType<string | ((row: any) => string | number)>,
  /**
   * 重写类型
   */
  pagination: {
    type: [Boolean, Object] as PropType<false | PaginationProps>,
    default: undefined,
  },
} as const

export type ProDataTableProps = ExtractPublicPropTypes<typeof proDataTableProps>
export type ProDataTableExtendProps = ExtractPublicPropTypes<typeof proDataTableExtendProps>
