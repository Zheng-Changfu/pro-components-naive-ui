import type { DynamicTagsProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proDynamicTagsProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<DynamicTagsProps>>,
} as const

export type ProDynamicTagsProps = ExtractPublicPropTypes<typeof proDynamicTagsProps>
