import type { MentionProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proMentionProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<MentionProps>>,
} as const

export type ProMentionProps = ExtractPublicPropTypes<typeof proMentionProps>
