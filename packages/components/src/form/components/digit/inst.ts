import type { InputNumberInst } from 'naive-ui'
import { useComponentInst } from '../../../composables'

export type ProDigitInst = InputNumberInst
export const useProDigitInst = createSharedComposable(useComponentInst<ProDigitInst>)
