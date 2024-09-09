import type { MentionInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../composables'

export type ProMentionInst = PickFunction<MentionInst>
export const useMentionInst = createProComponentInstanceFactory<ProMentionInst>('ProMention')
