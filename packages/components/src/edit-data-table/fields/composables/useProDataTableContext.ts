import type { Ref } from 'vue'
import type { ProDataTableInst } from '../../../data-table'
import { useInjectListFieldContext } from 'pro-components-hooks'
import { useInjectProFormInst } from '../../../form'

interface UseProDataTableReturn {
  methods: ProDataTableInst
  instRef: Ref<ProDataTableInst | undefined>
}
export function useProDataTableContext(): UseProDataTableReturn {
  const form = useInjectProFormInst()
  const instRef = ref<ProDataTableInst>()

  const {
    stringPath: tablePath,
  } = useInjectListFieldContext()!

  function setTableData(data: any[]) {
    if (form && tablePath.value) {
      form.setFieldValue(tablePath.value, data)
    }
  }

  return {
    instRef,
    methods: {
      setTableData,
      page: (page: any) => instRef.value?.page(page),
      clearFilter: () => instRef.value?.clearFilter(),
      clearSorter: () => instRef.value?.clearSorter(),
      clearFilters: () => instRef.value?.clearFilters(),
      getColumns: () => instRef.value?.getColumns() as any,
      filter: (filters: any) => instRef.value?.filter(filters),
      getTableSize: () => instRef.value?.getTableSize() as any,
      getTableData: () => instRef.value?.getTableData() as any,
      filters: (filters: any) => instRef.value?.filters(filters),
      getPagination: () => instRef.value?.getPagination() as any,
      scrollTo: (x?: any, y?: any) => instRef.value?.scrollTo(x, y),
      setTableSize: (size: any) => instRef.value?.setTableSize(size),
      reload: (params?: any) => instRef.value?.reload(params) as any,
      getCacheColumns: () => instRef.value?.getCacheColumns() as any,
      setColumns: (columns: any) => instRef.value?.setColumns(columns),
      setLoading: (loading: any) => instRef.value?.setLoading(loading),
      getRowKeyToRowMap: () => instRef.value?.getRowKeyToRowMap() as any,
      getSearchFormInst: () => instRef.value?.getSearchFormInst() as any,
      downloadCsv: (options?: any) => instRef.value?.downloadCsv(options),
      setPagination: (values: any) => instRef.value?.setPagination(values),
      setCacheColumns: (columns: any) => instRef.value?.setCacheColumns(columns),
      sort: (columnKey: any, order: any) => instRef.value?.sort(columnKey, order),
    },
  }
}
