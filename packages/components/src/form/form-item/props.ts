import type { CSSProperties, ExtractPublicPropTypes, LabelHTMLAttributes, PropType } from 'vue'
import type { FormItemRule, LabelAlign, LabelPlacement } from 'naive-ui/es/form/src/interface'
import type { ThemeProps } from 'naive-ui/es/_mixins'
import { useTheme } from 'naive-ui/es/_mixins'
import type { FormTheme } from 'naive-ui/es/form/styles'
import type { MaybeExpression } from 'pro-components-hooks'

/**
 * 这里的属性全是 naive-ui 中的
 * 重新定义属性，支持表达式（path 、theme props 不支持）
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
    type: Boolean as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  showFeedback: {
    type: Boolean as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  showLabel: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
} as const

export type ProFormItemProps = ExtractPublicPropTypes<typeof proFormItemProps>
