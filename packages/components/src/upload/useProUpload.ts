import { createProComponentInstanceFactory } from '../hooks'
import type { ProUploadInstance } from './inst'

export const useProUpload = createProComponentInstanceFactory<ProUploadInstance>('ProUpload')
