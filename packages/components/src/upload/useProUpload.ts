import { createProComponentInstanceFactory } from '../hooks'
import type { ProUploadInstance } from './inst'

export const useProUploadInstance = createProComponentInstanceFactory<ProUploadInstance>('ProUpload')
