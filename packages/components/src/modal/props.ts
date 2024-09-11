import { modalProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ProModalDraggable } from './types'

export const proModalExtendProps = {
  /**
   * 弹窗是否可拖拽，无预设时不生效
   */
  draggable: {
    type: [Boolean, Object] as PropType<ProModalDraggable>,
    default: true,
  },
  /**
   * 弹窗是否可全屏，无预设时不生效，可通过实例方法实现全屏
   */
  fullscreen: {
    type: Boolean,
    default: true,
  },
} as const

export const proModalProps = {
  ...modalProps,
  ...proModalExtendProps,
} as const

export type ProModalProps = ExtractPublicPropTypes<typeof proModalProps>
export type ProModalExtendProps = ExtractPublicPropTypes<typeof proModalExtendProps>