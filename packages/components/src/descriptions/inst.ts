import { createProComponentInstanceFactory } from '../composables'
import type { PickFunction } from '../types'

export interface ProDescriptionsInst {
  /**
   * 重新调用 request
   */
  reload: (params?: any) => Promise<void>
}
export const useProDescriptionsInst = createProComponentInstanceFactory<PickFunction<ProDescriptionsInst>>('ProDescriptions')
