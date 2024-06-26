import type { InputProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proInputProps = {
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
  /**
   * n-input 的所有属性，每一个属性都支持表达式
   * 剔除掉 defaultValue 属性
   * 剔除掉 fieldProps 中的 v-model:value
   * 剔除掉 type 属性，由专门的组件去实现
   * 剔除掉 pair 属性，由专门的组件去实现
   * 剔除掉 placeholder 属性，放在上层
   */
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<InputProps, 'value' | 'placeholder' | 'onUpdateValue' | 'onUpdate:value' | 'type' | 'pair' | 'defaultValue'>>>,
    default: () => ({}),
  },
} as const

export type ProInputProps = ExtractPublicPropTypes<typeof proInputProps>
