import type { CheckboxGroupProps, CheckboxProps, FlexProps, SpinProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'
import type { UseInternalRequestOptions } from '../_internal/useInternalRequest'
import type { ExtendPublicProps } from '../../../types'

interface ProCheckboxGroupFieldProps extends CheckboxGroupProps {
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
  CheckboxProps,
  | 'checked'
  | 'default-checked'
  | 'onUpdateChecked'
  | 'onUpdate:checked'
> & ([x: string])>
}

export const proCheckboxGroupProps = {
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
   * 包裹 n-checkbox 的 flex 属性
   */
  flexProps: {
    type: Object as PropType<FlexProps>,
    default: () => ({}),
  },
  /**
   * 请求配置
   */
  fetchConfig: {
    type: Object as PropType<MaybeExpression<UseInternalRequestOptions>>,
    default: () => ({}),
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendPublicProps<Omit<
    ProCheckboxGroupFieldProps,
    | 'value'
    | 'defaultValue'
    | 'onUpdateValue'
    | 'onUpdate:value'
    >>>>,
    default: () => ({}),
  },
} as const

export type ProCheckboxGroupProps = ExtractPublicPropTypes<typeof proCheckboxGroupProps>
