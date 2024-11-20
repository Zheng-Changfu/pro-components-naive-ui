import type { Merge } from 'type-fest'
import type { ProSearchFormInst } from './inst'

export interface ProSearchFormSlots {
  suffix?: Merge<ProSearchFormInst, {
    collapsed: boolean
  }>
}
