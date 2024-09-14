import type { PickFunction } from '../types'
import { createProComponentInstanceFactory } from '../composables'

export interface ProDescriptionsInst {
  /**
   * 重新调用 request
   */
  reload: (params?: any) => Promise<void>
}
export const useProDescriptionsInst = createProComponentInstanceFactory<PickFunction<ProDescriptionsInst>>('ProDescriptions')
