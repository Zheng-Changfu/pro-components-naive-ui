import type { GridProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProButtonProps } from '../../../button'
import type { ProSearchFormColumns } from './types'
import { proFormProps } from '../../../form'

export const proSearchFormProps = {
  ...proFormProps,
  /**
   * 重写默认值
   */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: 'auto',
  },
  /**
   * 重写默认值
   */
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'left',
  },
  /**
   * 表单项集合
   */
  columns: [Array, Function] as PropType<ProSearchFormColumns>,
  /**
   * 重置按钮的属性，false 不显示
   */
  resetButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 查询按钮的属性，false 不显示
   */
  searchButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 展开收起按钮的属性，false 不显示
   */
  collapseButtonProps: {
    type: [Object, Boolean] as PropType<ProButtonProps | false>,
    default: undefined,
  },
  /**
   * 栅格组件的属性
   */
  gridProps: Object as PropType<GridProps>,
  /**
   * 是否显示后缀(收起、重置、搜索)
   */
  showSuffixGridItem: {
    type: Boolean,
    default: true,
  },
  /**
   * 重置后触发的事件
   */
  onReset: Function as PropType<() => void>,
  /**
   * 搜索后触发的事件
   */
  onSearch: Function as PropType<(values: any) => void>,
  /**
   * 收起后触发的事件
   */
  onCollapse: Function as PropType<(collapsed: boolean) => void>,
} as const

export type ProSearchFormProps = ExtractPublicPropTypes<typeof proSearchFormProps>
