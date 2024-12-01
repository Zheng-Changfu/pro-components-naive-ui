import type { SelectProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProSelectSlots extends ProFieldSharedSlots<SelectProps> {
  empty: any
  arrow: any
  action: any
  header: any
}
