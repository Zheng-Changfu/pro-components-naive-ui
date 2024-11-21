import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../../../button'
import { drawerContentProps } from 'naive-ui'

export type FooterRender = (opt: {
  footerDom: VNodeChild
}) => VNodeChild

export const proDrawerContentExtendProps = {
/**
 * 底部内容，false 不显示
 */
  footer: {
    type: [Function, Boolean] as PropType<false | FooterRender>,
    default: undefined,
  },
  /**
   * 传递给取消按钮的属性，false 不显示按钮
   */
  resetButtonProps: {
    type: [Boolean, Object] as PropType<false | ProButtonProps>,
    default: undefined,
  },
  /**
   * 传递给确认按钮的属性，false 不显示按钮
   */
  submitButtonProps: {
    type: [Boolean, Object] as PropType<false | ProButtonProps>,
    default: undefined,
  },
} as const

export const proDrawerContentProps = {
  ...drawerContentProps,
  ...proDrawerContentExtendProps,
} as const

export type ProDrawerContentProps = ExtractPublicPropTypes<typeof proDrawerContentProps>
export type ProDrawerContentExtendProps = ExtractPublicPropTypes<typeof proDrawerContentExtendProps>
