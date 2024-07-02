import { createProComponentInstanceFactory } from '../hooks'
import type { ProInputInstance } from './inst'

export const useProInputInstance = createProComponentInstanceFactory<ProInputInstance>('ProInput')
