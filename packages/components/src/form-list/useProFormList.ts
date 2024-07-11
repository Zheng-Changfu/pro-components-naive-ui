import { createProComponentInstanceFactory } from '../hooks'
import type { ProFormListInstance } from './inst'

export const useProFormListInstance = createProComponentInstanceFactory<ProFormListInstance>('ProFormList')
