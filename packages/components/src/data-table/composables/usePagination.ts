import type { PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { computed, watch } from 'vue'

export function usePagination(props: ComputedRef<ProDataTableProps>) {
  const pagination = ref<PaginationProps | false>({})

  watch(
    computed(() => props.value.pagination ?? {}),
    v => pagination.value = v,
  )

  const paginationInfo = computed(() => {
    const { pagination: propPagination } = props.value

    if (propPagination === false || pagination.value === false) {
      return false
    }

    return {
      page: 1,
      pageSize: 10,
      ...(propPagination as any ?? {}),
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
