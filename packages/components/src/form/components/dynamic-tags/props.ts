import type { DynamicTagsProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proDynamicTagsProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<DynamicTagsProps>>,
} as const

export type ProDynamicTagsProps = ExtractPublicPropTypes<typeof proDynamicTagsProps>
