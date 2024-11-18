import type { MentionProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proMentionProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<MentionProps>>,
} as const

export type ProMentionProps = ExtractPublicPropTypes<typeof proMentionProps>
