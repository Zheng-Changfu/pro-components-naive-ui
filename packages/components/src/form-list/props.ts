import type { ExtractPublicPropTypes } from 'vue'
import { proFieldProps, proFormItemProps } from '../form'

export const proFormListProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
} as const

export type ProFormListProps = ExtractPublicPropTypes<typeof proFormListProps>
