import { createProComponentInstanceFactory } from '../hooks'
import type { ProTextareaInstance } from './inst'

export const useProTextareaInstance = createProComponentInstanceFactory<ProTextareaInstance>('ProTextarea')
