import type { CSSProperties, ExtractPublicPropTypes, LabelHTMLAttributes, PropType } from 'vue'
import type { LabelAlign, LabelPlacement } from 'naive-ui/es/form/src/interface'
import type { ThemeProps } from 'naive-ui/es/_mixins'
import { useTheme } from 'naive-ui/es/_mixins'
import type { FormTheme } from 'naive-ui/es/form/styles'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ProFormItemRule } from './types'

export const proFormItemExtendProps = {
  /**
   * 精简模式，不包装 formItem
   */
  simple: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 传递给 input.. 等的属性
   * 类型会被 input... 等重写
   * 这里只是占位
   */
  fieldProps: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 传递给 input.. 等的属性
   * 类型会被 input... 等重写
   * 这里只是占位
   */
  placeholder: undefined as any as PropType<any>,
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
  labelStyle: [String, Object] as PropType<MaybeExpression<CSSProperties | string>>,
  feedbackStyle: [String, Object] as PropType<MaybeExpression<CSSProperties | string>>,
  validationStatus: String as PropType<MaybeExpression<'error' | 'warning' | 'success'>>,
  rule: [Object, Array] as PropType<MaybeExpression<ProFormItemRule | ProFormItemRule[]>>,
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
