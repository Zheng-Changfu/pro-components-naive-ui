import type { PopoverProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { proFormItemProps } from '../form-item'

export const proPopoverFormItemProps = {
  ...proFormItemProps,
  /**
   * 传递给 popover 的 props
   */
  popoverProps: Object as PropType<PopoverProps>,
} as const

export type ProPopoverFormItemProps = ExtractPublicPropTypes<typeof proPopoverFormItemProps>
