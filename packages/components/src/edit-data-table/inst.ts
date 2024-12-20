import type { ArrayFieldAction } from 'pro-composables'
import type { Merge } from 'type-fest'
import type { ProDataTableInst } from '../data-table/inst'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../composables'

export type ProEditDataTableInst<RowData = any> = Merge<ArrayFieldAction<RowData>, ProDataTableInst>

const [
  provideEditDataTableInstStore,
  useInjectEditDataTableInstStore,
] = createInjectionState(useComponentInst<ProEditDataTableInst>)

export {
  provideEditDataTableInstStore,
  useInjectEditDataTableInstStore,
}
