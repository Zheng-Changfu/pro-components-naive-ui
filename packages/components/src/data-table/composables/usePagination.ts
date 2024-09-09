import type { PaginationProps } from 'naive-ui'
import { watch } from 'vue'

export function usePagination(props) {
  const pagination = ref<PaginationProps | false>({})

  watch(
    toRef(props, 'pagination'),
    v => pagination.value = v,
  )

  const paginationInfo = computed<PaginationProps | false>(() => {
    const { pagination: _pagination } = props
    if (_pagination === false || pagination.value === false) {
      return false
    }
    return {
      page: 1,
      pageSize: 10,
      ..._pagination,
      ...pagination.value,
    }
  })

  function setPagination(info: Partial<PaginationProps> | false) {
    if (info === false) {
      pagination.value = false
      return
    }
    pagination.value = {
      ...(paginationInfo.value === false ? {} : paginationInfo.value),
      ...info,
    }
  }

  return {
    setPagination,
    pagination: paginationInfo,
  }
}
