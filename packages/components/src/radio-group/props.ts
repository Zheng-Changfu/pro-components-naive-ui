import type { RadioGroupProps, RadioProps, SpaceProps, SpinProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

interface ProRadioGroupFieldProps extends Omit<RadioGroupProps, 'value' | 'onUpdateValue' | 'onUpdate:value' | 'defaultValue'> {
  /**
   * 选项 label 的字段名
   * @default 'label'
   */
  labelField?: string
  /**
   * 选项 value 的字段名
   * @default 'value'
   */
  valueField?: string
  /**
   * 配置选项内容
   */
  options?: Array<Omit<RadioProps, 'checked' | 'default-checked' | 'onUpdate:checked' | 'onUpdateChecked'> & ([x: string])>
}

export const proRadioGroupProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * loading 组件属性
   */
  spinProps: {
    type: Object as PropType<SpinProps>,
    default: () => ({}),
  },
  /**
   * 请求配置
   */
  fetchConfig: {
    type: Object as PropType<UseRequestOptions<any, any>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<ProRadioGroupFieldProps>>,
    default: () => ({}),
  },
  /**
   * 包裹 n-radio 的 space 属性
   */
  wrapperSpaceProps: {
    type: Object as PropType<MaybeExpression<SpaceProps>>,
    default: () => ({}),
  },
} as const

export type ProRadioGroupProps = ExtractPublicPropTypes<typeof proRadioGroupProps>
