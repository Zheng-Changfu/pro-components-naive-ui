import type { AutoCompleteInst } from 'naive-ui'
import { createSharedComposable } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProAutoCompleteInst = AutoCompleteInst
export const useProAutoCompleteInst = createSharedComposable(useComponentInst<ProAutoCompleteInst>)
