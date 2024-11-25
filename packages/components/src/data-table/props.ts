import type { PaginationProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProCardProps } from '../card'
import type { ProSearchFormProps } from './components/search-form'
import type { ProDataTableColumns, ProDataTableToolbarSetting } from './types'
import { omit } from 'lodash-es'
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
   * 包裹表格卡片的配置
   */
  tableCardProps: Object as PropType<ProCardProps>,
  /**
   * 如果有单选、多选，是否可以点击行就选中
   */
  clickRowToSelect: Boolean,
  /**
   * 查询表单配置，false 不显示
   */
  searchFormProps: {
    type: [Boolean, Object] as PropType<false | ProSearchFormProps>,
    default: false,
  },
  /**
   * 查询区域卡片的配置
   */
  searchCardProps: Object as PropType<ProCardProps>,
  /**
   * 工具栏配置
   */
  toolbarSetting: {
    type: [Boolean, Object] as PropType<boolean | ProDataTableToolbarSetting>,
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
} as const

export const proDataTableProps = {
  ...omit(dataTableProps, [
    'data',
    'rowKey',
    'onLoad',
  ]),
  ...proDataTableExtendProps,
  /**
   * 重写类型
   */
  columns: Array as PropType<ProDataTableColumns>,
  /**
   * 重写默认值
   */
  pagination: {
    type: [Boolean, Object] as PropType<false | PaginationProps>,
    default: undefined,
  },
} as const

export type ProDataTableProps = ExtractPublicPropTypes<typeof proDataTableProps>
export type ProDataTableExtendProps = ExtractPublicPropTypes<typeof proDataTableExtendProps>
