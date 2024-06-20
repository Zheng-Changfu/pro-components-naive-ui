import { createProComponentInstanceFactory } from '../hooks'
import type { ProTreeInstance } from './inst'

export const useProTree = createProComponentInstanceFactory<ProTreeInstance>('ProTree')
