import type { UploadInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProUploadInstance = PickFunction<UploadInst>
export const useProUploadInstance = createProComponentInstanceFactory<ProUploadInstance>('ProUpload')
