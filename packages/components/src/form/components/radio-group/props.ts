import type { RadioGroupProps, RadioProps, SpaceProps, SpinProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'

interface ProRadioGroupFieldProps extends RadioGroupProps {
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
  options?: Array<Omit<
  RadioProps,
  | 'checked'
  | 'defaultChecked'
  | 'onUpdateChecked'
  | 'onUpdate:checked'
> & ([x: string])>
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
    default: () => ({}),
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    ProRadioGroupFieldProps,
    | 'value'
    | 'defaultValue'
    | 'onUpdateValue'
    | 'onUpdate:value'
>>>,
    default: () => ({}),
  },
  /**
   * 包裹 n-radio 的 space 属性
   */
  spaceProps: {
    type: Object as PropType<SpaceProps>,
    default: () => ({}),
  },
} as const

export type ProRadioGroupProps = ExtractPublicPropTypes<typeof proRadioGroupProps>
