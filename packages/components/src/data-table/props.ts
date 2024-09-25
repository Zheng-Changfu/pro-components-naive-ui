import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProCardProps } from '../card'
import type { RefreshOnWindowFocus } from '../composables/useFetchData'
import type { AnyFn } from '../types'
import type { ProSearchFormProps } from './components/search-form'
import type { ProDataTableColumn, ProDataTableColumns, ProDataTableFieldSetting } from './types'
import { dataTableProps } from 'naive-ui'

export const proDataTableExtendProps = {
  /**
   * 表格标题
   */
  title: String,
  /**
   * 提示文字，显示在标题的右边
   */
  titleTooltip: [String, Array] as PropType<string | string[]>,
  /**
   * 如果有单选、多选，是否可以点击行就选中
   */
  clickRowToSelect: {
    type: Boolean,
    default: true,
  },
  /**
   * 查询表单配置，false 不显示
   */
  searchForm: {
    type: [Boolean, Object] as PropType<false | ProSearchFormProps>,
    default: false,
  },
  /**
   * 查询区域卡片的 props
   */
  searchAreaCardProps: Object as PropType<ProCardProps>,
  /**
   * 序号列，false 不显示
   */
  indexColumn: {
    type: [Boolean, Object] as PropType<false | ProDataTableColumn>,
    default: undefined,
  },
  /**
   * 数据源分页相关字段配置
   */
  fieldSetting: Object as PropType<ProDataTableFieldSetting>,
  /**
   * 在页码发生变化时是否清除选中行
   */
  clearSelectOnPageChange: Boolean,
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
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => string | number)>,
    required: true,
  },
} as const

/**
 * bordered
 * builtinThemeOverrides
 */

// proCardProps.tooltip
// proDataTableProps.

export type ProDataTableProps = ExtractPublicPropTypes<typeof proDataTableProps>
export type ProDataTableExtendProps = ExtractPublicPropTypes<typeof proDataTableExtendProps>
