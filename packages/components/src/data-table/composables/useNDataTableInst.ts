import type { DataTableInst } from 'naive-ui'
import type { ProDataTableInst } from '../inst'
import { ref } from 'vue'

export function useNDataTableInst() {
  const proDataTableInst = ref<ProDataTableInst>()

  function registerProDataTableInst(proDataTable: ProDataTableInst) {
    proDataTableInst.value = proDataTable
  }

  return {
    proDataTableInst,
    registerProDataTableInst,
    clearSorter: () => proDataTableInst.value?.clearSorter(),
    clearFilter: () => proDataTableInst.value?.clearFilter(),
    clearFilters: () => proDataTableInst.value?.clearFilters(),
    getSortInfo: () => proDataTableInst.value?.getSortInfo(),
    getFilterInfo: () => proDataTableInst.value?.getFilterInfo(),
    page: (page: number) => proDataTableInst.value?.page(page),
    getPaginationInfo: () => proDataTableInst.value?.getPaginationInfo(),
    filter: (filters: any) => proDataTableInst.value?.filter(filters),
    filters: (filters: any) => proDataTableInst.value?.filters(filters),
    downloadCsv: (options?: any) => proDataTableInst.value?.downloadCsv(options),
    scrollTo: (...args: any[]) => (proDataTableInst.value?.scrollTo as any)(...args),
    sort: (columnKey: any, order: any) => proDataTableInst.value?.sort(columnKey, order),
  }
}
