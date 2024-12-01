import type { CascaderProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProCascaderSlots extends ProFieldSharedSlots<CascaderProps> {
  'empty': any
  'arrow': any
  'action': any
  'not-found': any
}
