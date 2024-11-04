import type { MentionInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProMentionInst = MentionInst

const [
  provideMentionInstStore,
  useInjectMentionInstStore,
] = createInjectionState(useComponentInst<ProMentionInst>)

export {
  provideMentionInstStore,
  useInjectMentionInstStore,
}
