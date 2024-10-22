import type { Ref } from 'vue'
import type { ColumnItem } from './useColumnList'
import { computed, ref } from 'vue'
import { useInjectProDataTableInst } from '../../../context'

export function useCheckedColumns(columnList: Ref<ColumnItem[]>) {
  const checkedKeys = ref<Array<string | number>>([])

  const {
    setColumns,
    getCacheColumns,
  } = useInjectProDataTableInst()!

  const allChecked = computed({
    get() {
      const listLen = columnList.value.length
      const checkedLen = checkedKeys.value.length
      return listLen === checkedLen
    },
    set(value) {
      value ? checkedAll() : clearAll()
    },
  })

  const indeterminate = computed(() => {
    return !allChecked.value && checkedKeys.value.length !== 0
  })

  function checkedAll() {
    checkedKeys.value = columnList.value.map(item => item.key)
  }

  function clearAll() {
    checkedKeys.value = []
  }

  function restore() {
    checkedAll()
  }

  onMounted(checkedAll)

  watchEffect(() => {
    const tableColumns = [...getCacheColumns()]
    const shouldHiddenColumnKeys = columnList.value
      .filter(column => !checkedKeys.value.includes(column.key))
      .map(column => column.key)

    const visibleColumns = tableColumns.filter(column => !shouldHiddenColumnKeys.includes((column as any).key))
    setColumns(visibleColumns)
  })

  return {
    restore,
    clearAll,
    checkedAll,
    allChecked,
    checkedKeys,
    indeterminate,
  }
}
