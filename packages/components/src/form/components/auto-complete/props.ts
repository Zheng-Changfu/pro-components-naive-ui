import type { AutoCompleteProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

interface ProAutoCompleteFieldProps extends Omit<AutoCompleteProps, 'options'> {
  /**
   * options 类型重写，支持函数，方便传递 value 值创建自动填充的选项
   */
  options?: AutoCompleteProps['options'] | ((value: string | null) => NonNullable<AutoCompleteProps['options']>)
}

export const proAutoCompleteProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ProAutoCompleteFieldProps>>>,
    default: () => ({}),
  },
} as const

export type ProAutoCompleteProps = ExtractPublicPropTypes<typeof proAutoCompleteProps>
