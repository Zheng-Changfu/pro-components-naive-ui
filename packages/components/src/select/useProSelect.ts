import { createProComponentInstanceFactory } from '../hooks'
import type { ProSelectInstance } from './inst'

export const useProSelectInstance = createProComponentInstanceFactory<ProSelectInstance>('ProSelect')
