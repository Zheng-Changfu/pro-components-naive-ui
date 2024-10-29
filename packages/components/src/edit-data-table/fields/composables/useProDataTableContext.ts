import type { Ref } from 'vue'
import type { ProDataTableInst } from '../../../data-table'
import { useInjectFieldContext } from 'pro-components-hooks'
import { useProDataTableInst } from '../../../data-table'
import { useInjectProFormInst } from '../../../form'

type UseProDataTableReturn = [
  Ref<ProDataTableInst>,
  ProDataTableInst,
]
export function useProDataTableContext(): UseProDataTableReturn {
  const form = useInjectProFormInst()

  const [
    instRef,
    {
      reload,
      setColumns,
      setLoading,
      getColumns,
      getTableData,
      setTableSize,
      getTableSize,
      getPagination,
      setPagination,
      setCacheColumns,
      getCacheColumns,
      getSearchFormInst,
      getRowKeyToRowMap,
      setTableData: _setTableData,
    },
  ] = useProDataTableInst()

  const {
    stringPath: tablePath,
  } = useInjectFieldContext()!

  function setTableData(data: any[]) {
    if (form && tablePath.value) {
      form.setFieldValue(tablePath.value, data)
    }
  }

  return [
    instRef,
    {
      reload,
      setColumns,
      setLoading,
      getColumns,
      setTableData,
      getTableData,
      setTableSize,
      getTableSize,
      getPagination,
      setPagination,
      setCacheColumns,
      getCacheColumns,
      getSearchFormInst,
      getRowKeyToRowMap,
    },
  ] as UseProDataTableReturn
}
