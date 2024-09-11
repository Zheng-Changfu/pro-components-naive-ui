import type { AutoCompleteInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../composables'

export type ProAutoCompleteInst = PickFunction<AutoCompleteInst>
export const useProAutoCompleteInst = createProComponentInstanceFactory<ProAutoCompleteInst>('ProAutoComplete')
