import { createProComponentInstanceFactory } from '../hooks'
import type { ProTreeInstance } from './inst'

export const useProTreeInstance = createProComponentInstanceFactory<ProTreeInstance>('ProTree')
