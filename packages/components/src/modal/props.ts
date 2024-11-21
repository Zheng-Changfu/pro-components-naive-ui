import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProModalDraggableOptions } from './types'
import { modalProps } from 'naive-ui'

export const proModalExtendProps = {
  /**
   * 弹窗是否可拖拽
   */
  draggable: {
    type: [Boolean, Object] as PropType<false | ProModalDraggableOptions>,
    default: undefined,
  },
} as const

export const proModalProps = {
  ...modalProps,
  ...proModalExtendProps,
  /**
   * 调整默认值为 false
   */
  autoFocus: Boolean,
} as const

export type ProModalProps = ExtractPublicPropTypes<typeof proModalProps>
export type ProModalExtendProps = ExtractPublicPropTypes<typeof proModalExtendProps>
