import type { CheckboxInst } from 'naive-ui'
import { createSharedComposable } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProCheckboxInst = CheckboxInst
export const useProCheckboxInst = createSharedComposable(useComponentInst<ProCheckboxInst>)
