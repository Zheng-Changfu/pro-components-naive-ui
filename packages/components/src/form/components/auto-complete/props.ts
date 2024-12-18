import type { AutoCompleteProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export interface ProAutoCompleteFieldProps extends Omit<AutoCompleteProps, 'options'> {
  /**
   * options 类型重写，支持函数，方便传递 value 值创建自动填充的选项
   */
  options?: AutoCompleteProps['options'] | ((value: string | null) => NonNullable<AutoCompleteProps['options']>)
}

export const proAutoCompleteProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<ProAutoCompleteFieldProps>>,
} as const

export type ProAutoCompleteProps = ExtractPublicPropTypes<typeof proAutoCompleteProps>
