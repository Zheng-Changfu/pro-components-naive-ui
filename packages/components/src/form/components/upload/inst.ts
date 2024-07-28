import type { UploadInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProUploadInst = PickFunction<UploadInst>
export const useProUploadInst = createProComponentInstanceFactory<ProUploadInst>('ProUpload')
