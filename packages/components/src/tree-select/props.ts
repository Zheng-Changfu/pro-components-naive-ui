import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proTreeSelectProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * 透传给表单，支持表达式
   */
  placeholder: {
    type: String as PropType<MaybeExpression<string>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<TreeSelectProps, 'value' | 'placeholder' | 'onUpdateValue' | 'onUpdate:value' | 'defaultValue'>>>,
    default: () => ({}),
  },
} as const

export type ProTreeSelectProps = ExtractPublicPropTypes<typeof proTreeSelectProps>
