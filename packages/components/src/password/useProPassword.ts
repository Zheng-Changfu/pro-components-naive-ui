import { createProComponentInstanceFactory } from '../hooks'
import type { ProPasswordInstance } from './inst'

export const useProPasswordInstance = createProComponentInstanceFactory<ProPasswordInstance>('ProPassword')
