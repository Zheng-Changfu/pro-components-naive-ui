import type { Simplify } from 'type-fest'
import type { ProCardSlots } from '../card'

interface DialogSlots {
  icon: any
  close: any
  header: any
  action: any
}
export type ProModalSlots = Simplify<
  & Omit<ProCardSlots, 'collapse' | 'default'>
  & DialogSlots
  & {
    default: { draggableClass: string }
  }
>
