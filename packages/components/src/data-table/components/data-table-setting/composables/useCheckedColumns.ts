import { computed, ref } from 'vue'
import { useInjectProDataTableInst } from '../../../context'

export function useCheckedColumns() {
  const { getColumns } = useInjectProDataTableInst()!
  const checkedColumnKeys = ref<Array<string | number>>([])

  const visibleColumnsChecked = computed({
    get() {
      return checkedColumnKeys.value.length === getColumns().length
    },
    set(value) {
      value
        ? checkedAllColumnKeys()
        : clearAllColumnKeys()
    },
  })

  const visibleColumnsIndeterminate = computed(() => {
    return !visibleColumnsChecked.value && checkedColumnKeys.value.length !== 0
  })

  function checkedAllColumnKeys() {
    checkedColumnKeys.value = getColumns().map(column => column.key)
  }

  function clearAllColumnKeys() {
    checkedColumnKeys.value = []
  }

  return {
    checkedColumnKeys,
    clearAllColumnKeys,
    checkedAllColumnKeys,
    visibleColumnsChecked,
    visibleColumnsIndeterminate,
  }
}
