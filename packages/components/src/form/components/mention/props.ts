import type { MentionProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-composables'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proMentionProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<MentionProps>>>,
    default: () => ({}),
  },
} as const

export type ProMentionProps = ExtractPublicPropTypes<typeof proMentionProps>
