import type { CSSProperties, ExtractPublicPropTypes, LabelHTMLAttributes, PropType, VNodeChild } from 'vue'
import type { FormItemRule, LabelAlign, LabelPlacement } from 'naive-ui/es/form/src/interface'
import type { ThemeProps } from 'naive-ui/es/_mixins'
import { useTheme } from 'naive-ui/es/_mixins'
import type { FormTheme } from 'naive-ui/es/form/styles'
import type { MaybeExpression } from 'pro-components-hooks'
import type { FormItemProps } from 'naive-ui'

export type FieldRender = (
  opts: {
    bindProps: Record<string, any>
    bindSlots: Record<string, any>
  }) => VNodeChild

export type FormItemRender = (
  opt: {
    bindProps: FormItemProps
    bindSlots: Record<string, any>
  }) => VNodeChild

export type FieldGroupRender = (
  opts: {
    vnode: VNodeChild
  }) => VNodeChild

export const proFormItemExtendProps = {
  /**
   * 精简模式，不包装 formItem
   */
  simple: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean>>,
    default: false,
  },
  /**
   * 是否只读
   */
  readonly: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean>>,
    default: undefined,
  },
  /**
   * 自定义渲染只读模式下的控件
   */
  renderReadonly: Function as PropType<(
    (opt: { value: any }) => VNodeChild
  )>,
  /**
   * 自定义渲染只读模式下并且内容为空时的控件
   */
  renderReadonlyEmpty: Function as PropType<(
    (opt: { value: any }) => VNodeChild
  )>,
  /**
   * 自定义渲染控件
   */
  fieldRender: Function as PropType<FieldRender>,
  /**
   * 自定义渲染 formItem
   */
  formItemRender: Function as PropType<FormItemRender>,
  /**
   * 自定义渲染控件组（控件 + 前后缀插槽）
   * @param vnode 控件组的虚拟节点
   */
  fieldGroupRender: Function as PropType<FieldGroupRender>,
  /**
   * NFormItem 的类名
   */
  formItemClass: String as PropType<MaybeExpression<string>>,
  /**
   * NFormItem 的样式
   */
  formItemStyle: Object as PropType<MaybeExpression<CSSProperties>>,
} as const

/**
 * 这里的属性全是 naive-ui 中的
 * 重新定义属性，支持表达式（path 、theme props 不支持）
 * 对 rule 做了一些扩展
 */
export const proFormItemProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  path: String,
  label: String as PropType<MaybeExpression<string>>,
  rulePath: String as PropType<MaybeExpression<string>>,
  feedback: String as PropType<MaybeExpression<string>>,
  feedbackClass: String as PropType<MaybeExpression<string>>,
  labelAlign: String as PropType<MaybeExpression<LabelAlign>>,
  first: [Boolean, String] as PropType<MaybeExpression<boolean>>,
  required: [Boolean, String] as PropType<MaybeExpression<boolean>>,
  labelPlacement: String as PropType<MaybeExpression<LabelPlacement>>,
  labelProps: [Object] as PropType<MaybeExpression<LabelHTMLAttributes>>,
  size: String as PropType<MaybeExpression<'small' | 'medium' | 'large'>>,
  ignorePathChange: [Boolean, String] as PropType<MaybeExpression<boolean>>,
  labelWidth: [Number, String] as PropType<MaybeExpression<string | number>>,
  rule: [Object, Array] as PropType<MaybeExpression<FormItemRule | FormItemRule[]>>,
  labelStyle: [String, Object] as PropType<MaybeExpression<CSSProperties | string>>,
  feedbackStyle: [String, Object] as PropType<MaybeExpression<CSSProperties | string>>,
  validationStatus: String as PropType<MaybeExpression<'error' | 'warning' | 'success'>>,
  requireMarkPlacement: String as PropType<MaybeExpression<'left' | 'right' | 'right-hanging'>>,
  showRequireMark: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  showFeedback: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  showLabel: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  ...proFormItemExtendProps,
} as const

export type ProFormItemProps = ExtractPublicPropTypes<typeof proFormItemProps>
export type ProFormItemExtendProps = ExtractPublicPropTypes<typeof proFormItemExtendProps>
