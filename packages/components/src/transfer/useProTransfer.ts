import { createProComponentInstanceFactory } from '../hooks'
import type { ProTransferInstance } from './inst'

export const useProTransferInstance = createProComponentInstanceFactory<ProTransferInstance>('ProTransfer')
