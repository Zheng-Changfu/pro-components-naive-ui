import type { Merge } from 'type-fest'
import type { ProDataTableSlots } from '../data-table'
import type { ProFieldSharedSlots } from '../form'

export type ProEditDataTableSlots = Merge<
  ProDataTableSlots,
  Omit<ProFieldSharedSlots<any>, 'input'>
>
