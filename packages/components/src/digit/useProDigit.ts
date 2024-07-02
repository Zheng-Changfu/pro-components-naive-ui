import { createProComponentInstanceFactory } from '../hooks'
import type { ProDigitInstance } from './inst'

export const useProDigitInstance = createProComponentInstanceFactory<ProDigitInstance>('ProDigit')
