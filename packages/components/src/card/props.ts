import type { CardSegmented } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { cardProps, collapseTransitionProps } from 'naive-ui'

export const proCardExtendProps = {
  /**
   * 提示文字，显示在 title 的右边
   */
  tooltip: {
    type: [String, Array] as PropType<string | string[]>,
  },
  /**
   * 触发展开的区域，如果不想让某些区域触发展开，可以使用此属性
   */
  triggerAreas: {
    type: Array as PropType<Array<'main' | 'arrow'>>,
    default: () => ['main', 'arrow'],
  },
  /**
   * 是否显示展开收起
   */
  showCollapse: {
    type: Boolean,
    default: true,
  },
} as const

export const proCardProps = {
  ...cardProps,
  ...proCardExtendProps,
  ...collapseTransitionProps,
  /**
   * ---重写默认值---
   */
  segmented: {
    type: [Object, Boolean] as PropType<boolean | CardSegmented>,
    default: () => ({
      footer: true,
      content: true,
    }),
  },
} as const

export type ProCardProps = ExtractPublicPropTypes<typeof proCardProps>
export type ProCardExtendProps = ExtractPublicPropTypes<typeof proCardExtendProps>
