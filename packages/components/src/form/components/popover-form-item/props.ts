import type { PopoverProps } from 'naive-ui'
import { formItemProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'

export const proPopoverFormItemProps = {
  ...formItemProps,
  /**
   * 同 label
   */
  title: String,
  /**
   * 显示在 label 右边
   */
  tooltip: [String, Array] as PropType<string | string[]>,
  /**
   * 传递给 popover 的 props
   */
  popoverProps: Object as PropType<PopoverProps>,
} as const

export type ProPopoverFormItemProps = ExtractPublicPropTypes<typeof proPopoverFormItemProps>
