import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProCardProps } from '../card'
import type { ProDataTableColumns } from './types'
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
   * 如果有单选、多选，是否可以点击行就选中(必须传递 row-key 才生效)
   */
  clickRowToSelect: Boolean,
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
  ...dataTableProps,
  ...proDataTableExtendProps,
  /**
   * 重写类型
   */
  columns: Array as PropType<ProDataTableColumns>,
} as const

export type ProDataTableProps = ExtractPublicPropTypes<typeof proDataTableProps>
export type ProDataTableExtendProps = ExtractPublicPropTypes<typeof proDataTableExtendProps>
