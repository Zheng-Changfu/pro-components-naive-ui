import type { InputNumberInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDigitInst = PickFunction<InputNumberInst>
export const useProDigitInst = createProComponentInstanceFactory<ProDigitInst>('ProDigit')
