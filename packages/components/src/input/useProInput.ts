import { createProComponentInstanceFactory } from '../hooks'
import type { ProInputInstance } from './inst'

export const useProInput = createProComponentInstanceFactory<ProInputInstance>('ProInput')
