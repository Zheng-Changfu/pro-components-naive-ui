import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../button'
import type { CreateProModalFormReturn } from './composables/createProModalForm'
import { omit, pick } from 'lodash-es'
import { proFormProps } from '../form'
import { proModalProps } from '../modal/props'

console.log(
  '冲突的属性',
  pick(proFormProps, Object.keys(proModalProps)),
  pick(proModalProps, Object.keys(proFormProps)),
)

export type FooterRender = (opt: {
  /**
   * 取消按钮
   */
  resetButtonDom: VNodeChild
  /**
   * 确认按钮
   */
  submitButtonDom: VNodeChild
}) => VNodeChild

export const proModalFormExtendProps = {
  /**
   * 弹窗表单控制器
   */
  modalForm: {
    type: Object as PropType<CreateProModalFormReturn>,
    required: true,
  },
  /**
   * 当 display-directive 为 show 时，关闭弹窗后是否重置表单
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
} as const

export const proModalFormProps = {
  ...omit(proFormProps, 'form'),
  ...omit(proModalProps, [
    'show',
    'onUpdateShow',
    'onUpdate:show',
  ]),
  ...proModalFormExtendProps,
  /**
   * 调整默认值为 false
   */
  closeOnEsc: Boolean,
  /**
   * 调整默认值为 false
   */
  maskClosable: Boolean,
  /**
   * 不支持 dialog 和 confirm 预设
   */
  preset: String as PropType<'card'>,
  /**
   * 重写类型，为 false 不显示 footer
   */
  footer: {
    type: [Function, Boolean] as PropType<false | FooterRender>,
    default: undefined,
  },
} as const

export type ProModalFormProps = ExtractPublicPropTypes<typeof proModalFormProps>
export type ProModalFormExtendProps = ExtractPublicPropTypes<typeof proModalFormExtendProps>
