import type { InputNumberInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDigitInstance = PickFunction<InputNumberInst>
export const useProDigitInstance = createProComponentInstanceFactory<ProDigitInstance>('ProDigit')
