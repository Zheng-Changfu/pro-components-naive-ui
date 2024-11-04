import type { CascaderInst } from 'naive-ui'
import { createSharedComposable } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProCascaderInst = CascaderInst
export const useProCascaderInst = createSharedComposable(useComponentInst<ProCascaderInst>)
