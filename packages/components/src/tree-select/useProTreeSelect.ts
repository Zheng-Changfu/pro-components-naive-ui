import { createProComponentInstanceFactory } from '../hooks'
import type { ProTreeSelectInstance } from './inst'

export const useProTreeSelect = createProComponentInstanceFactory<ProTreeSelectInstance>('ProTreeSelect')
