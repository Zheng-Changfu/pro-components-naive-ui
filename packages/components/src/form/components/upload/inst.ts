import type { UploadInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProUploadInst = UploadInst

const [
  provideUploadInstStore,
  useInjectUploadInstStore,
] = createInjectionState(useComponentInst<ProUploadInst>)

export {
  provideUploadInstStore,
  useInjectUploadInstStore,
}
