import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'

export function useSimplePagination(props: ComputedRef<ProDataTableProps>) {
  function toPrevPageAndReloadTable() {
    
  }

  function toNextPageAndReloadTable() {

  }

  return {
    toPrevPageAndReloadTable,
    toNextPageAndReloadTable,
  }
}
