import type { PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { computed, watch } from 'vue'
import { call } from '../../_utils/call'
import { useLocale } from '../../locales'

export function usePagination(props: ComputedRef<ProDataTableProps>) {
  const pagination = ref<PaginationProps | false>({})
  const { getMessage } = useLocale('ProDataTable')

  watch(
    () => props.value.pagination ?? {},
    v => pagination.value = v as any,
  )

  const paginationInfo = computed<PaginationProps | false>(() => {
    const { pagination: propPagination } = props.value

    if (propPagination === false || pagination.value === false) {
      return false
    }

    return {
      page: 1,
      pageSize: 10,
      prefix: getMessage('paginationPrefix'),
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
      ...(paginationInfo.value === false ? {} : paginationInfo.value) as any,
      ...info,
    }
  }

  function onUpdatePage(page: number) {
    const {
      onUpdatePage,
      'onUpdate:page': _onUpdatePage,
    } = props.value

    setPagination({ page })

    if (onUpdatePage) {
      call(onUpdatePage, page)
    }
    if (_onUpdatePage) {
      call(_onUpdatePage, page)
    }
  }

  function onUpdatePageSize(pageSize: number) {
    const {
      onUpdatePageSize,
      'onUpdate:pageSize': _onUpdatePageSize,
    } = props.value

    setPagination({ page: 1, pageSize })

    if (onUpdatePageSize) {
      call(onUpdatePageSize, pageSize)
    }
    if (_onUpdatePageSize) {
      call(_onUpdatePageSize, pageSize)
    }
  }

  return {
    onUpdatePage,
    setPagination,
    onUpdatePageSize,
    pagination: paginationInfo,
  }
}
