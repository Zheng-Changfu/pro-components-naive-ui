import { createProComponentInstanceFactory } from '../hooks'
import type { ProTransferInstance } from './inst'

export const useProTransfer = createProComponentInstanceFactory<ProTransferInstance>('ProTransfer')
