import { createProComponentInstanceFactory } from '../hooks'
import type { ProDigitInstance } from './inst'

export const useProDigit = createProComponentInstanceFactory<ProDigitInstance>('ProDigit')
