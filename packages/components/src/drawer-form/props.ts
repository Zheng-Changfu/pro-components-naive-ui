import type { Simplify } from 'type-fest'
import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../button'
import type { CreateDrawerFormReturn } from './composables/createDrawerForm'
import { omit } from 'lodash-es'
import { drawerProps, type DrawerProps } from 'naive-ui'
import { proFormProps } from '../form'

export type FooterRender = (opt: {
  footerDom: VNodeChild
}) => VNodeChild

export const drawerFormExtendProps = {
  /**
   * 关闭弹窗后是否重置表单
   */
  restoreValuesOnClosed: {
    type: Boolean,
    default: true,
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
  /**
   * 透传给 drawer 的属性，某些属性有冲突时可能有用
   */
  drawerProps: {
    type: Object as PropType<Simplify<Omit<
      DrawerProps,
      | 'show'
      | 'onUpdateShow'
      | 'onUpdate:show'
    >>>,
  },
} as const

export const drawerFormProps = {
  ...omit(drawerProps, [
    'show',
    'onUpdateShow',
    'onUpdate:show',
  ]),
  ...drawerFormExtendProps,
  ...proFormProps,
  /**
   * 调整默认值为 false
   */
  closeOnEsc: Boolean,
  /**
   * 调整默认值为 false
   */
  maskClosable: Boolean,
  /**
   * 调整默认值为 false
   */
  autoFocus: Boolean,
  /**
   * 抽屉表单控制器
   */
  form: {
    type: Object as PropType<CreateDrawerFormReturn>,
    required: true,
  },
  /**
   * 重写类型，为 false 不显示 action
   */
  footer: {
    type: [Function, Boolean] as PropType<false | FooterRender>,
    default: undefined,
  },
} as const

export type DrawerFormProps = ExtractPublicPropTypes<typeof drawerFormProps>
export type DrawerFormExtendProps = ExtractPublicPropTypes<typeof drawerFormExtendProps>
