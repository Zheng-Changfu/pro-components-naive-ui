import type { DataTableColumn, DataTableProps } from 'naive-ui'
import type { ComputedRef, InjectionKey } from 'vue'
import type { ProDataTableColumn, ProDataTableToolbarSetting } from './types'
import { inject } from 'vue'

export const proDataTableConfigKey = Symbol('proDataTableConfig') as InjectionKey<{
  getColumns: () => DataTableColumn[]
  getCacheColumns: () => DataTableColumn[]
  tableSize: ComputedRef<NonNullable<DataTableProps['size']>>
  toolbarSetting: ComputedRef<false | ProDataTableToolbarSetting>
  setTableSize: (size: NonNullable<DataTableProps['size']>) => void
  setColumns: (columns: ProDataTableColumn[] | DataTableColumn[]) => void
  setCacheColumns: (columns: ProDataTableColumn[] | DataTableColumn[]) => void
}>

export function useInjectProDataTableConfig() {
  return inject(proDataTableConfigKey)!
}
