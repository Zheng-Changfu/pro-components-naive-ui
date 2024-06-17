import { createProComponentInstanceFactory } from '../hooks'
import type { ProSelectInstance } from './inst'

export const useProSelect = createProComponentInstanceFactory<ProSelectInstance>('ProSelect')
