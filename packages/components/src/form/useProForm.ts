import { createProComponentInstanceFactory } from '../hooks'
import type { ProFormInstance } from './inst'

export const useProForm = createProComponentInstanceFactory<ProFormInstance>()
