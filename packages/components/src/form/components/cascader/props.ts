import type { CascaderProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proCascaderProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<CascaderProps>>,
} as const

export type ProCascaderProps = ExtractPublicPropTypes<typeof proCascaderProps>
