import { formItemProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'

export const proFormItemProps = {
  ...formItemProps,
  /**
   * 同 label
   */
  title: String,
  /**
   * 显示在 label 右边的提示
   */
  tooltip: [String, Array] as PropType<string | string[]>,
} as const

export type ProFormItemProps = ExtractPublicPropTypes<typeof proFormItemProps>
