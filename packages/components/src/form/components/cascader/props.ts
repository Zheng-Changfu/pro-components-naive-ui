import type { CascaderProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proCascaderProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<CascaderProps>>,
} as const

export type ProCascaderProps = ExtractPublicPropTypes<typeof proCascaderProps>
