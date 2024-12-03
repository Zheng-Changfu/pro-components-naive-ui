import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proTreeSelectProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<TreeSelectProps>>,
} as const

export type ProTreeSelectProps = ExtractPublicPropTypes<typeof proTreeSelectProps>
