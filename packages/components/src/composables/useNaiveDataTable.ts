import type { DataTableFilterState, DataTableProps, DataTableSortState } from 'naive-ui'
import type { UsePaginationOptions, UsePaginationReturn } from 'pro-composables'
import type { ComputedRef } from 'vue'
import { usePagination } from 'pro-composables'
import { computed, onMounted } from 'vue'

export interface UseNaiveDataTableData {
  /**
   * 总条数
   */
  total: number
  /**
   * 列表数据
   */
  list: any[]
}

export type UseNaiveDataTableParams = [
  {
    /**
     * 当前页码
     */
    current: number
    /**
     * 分页大小
     */
    pageSize: number
    filters?: DataTableFilterState
    sorter?: DataTableSortState | DataTableSortState[] | null
    [key: string]: any
  },
  ...any[],
]

export type UseNaiveDataTableService<Data extends UseNaiveDataTableData, Params extends UseNaiveDataTableParams> = (
  ...args: Params
) => Promise<Data>

/**
 * 联动查询表单需要满足这个类型
 */
export interface SearchFormLike {
  validate: () => any
  onReset: () => void
  onSubmit: () => void
  getFieldsValue: () => Record<string, any>
}

export interface UseNaiveDataTableOptions<
  Data extends UseNaiveDataTableData,
  Params extends UseNaiveDataTableParams,
> extends UsePaginationOptions<Data, Params> {
  form?: SearchFormLike
}

export interface UseNaiveDataTableReturn<
  Data extends UseNaiveDataTableData,
  Params extends UseNaiveDataTableParams,
> extends UsePaginationReturn<Data, Params> {
  tableProps: ComputedRef<{
    remote: true
    loading: boolean
    data: Data['list']
    pagination: Exclude<DataTableProps['pagination'], undefined>
    onUpdatePage: Exclude<DataTableProps['onUpdatePage'], undefined>
    onUpdateSorter: Exclude<DataTableProps['onUpdateSorter'], undefined>
    onUpdateFilters: Exclude<DataTableProps['onUpdateFilters'], undefined>
    onUpdatePageSize: Exclude<DataTableProps['onUpdatePageSize'], undefined>
  }>
}

export function useNaiveDataTable<
  Data extends UseNaiveDataTableData,
  Params extends UseNaiveDataTableParams,
>(
  service: UseNaiveDataTableService<Data, Params>,
  options: UseNaiveDataTableOptions<Data, Params> = {},
): UseNaiveDataTableReturn<Data, Params> {
  const {
    form,
    manual,
    defaultParams,
    ...rest
  } = options

  const fetchInst = usePagination(service, {
    ...rest,
    manual: true,
  })

  function onTableChange(
    page: number,
    pageSize: number,
    filters: DataTableFilterState,
    sorter: DataTableSortState | DataTableSortState[] | null,
  ) {
    const { run, params } = fetchInst
    const [prevParams, ...restParams] = params.value ?? []
    run(
      // @ts-ignore
      {
        ...prevParams,
        sorter,
        filters,
        pageSize,
        current: page,
      },
      ...restParams,
    )
  }

  function onUpdatePage(page: number) {
    const {
      params,
      pagination,
    } = fetchInst

    onTableChange(
      page,
      pagination.pageSize.value,
      params.value?.[0].filters ?? {},
      params.value?.[0].sorter ?? null,
    )
  }

  function onUpdatePageSize(pageSize: number) {
    const {
      params,
      pagination,
    } = fetchInst

    onTableChange(
      pagination.current.value,
      pageSize,
      params.value?.[0].filters ?? {},
      params.value?.[0].sorter ?? null,
    )
  }

  function onUpdateFilters(filters: DataTableFilterState) {
    const {
      params,
      pagination,
    } = fetchInst

    onTableChange(
      pagination.current.value,
      pagination.pageSize.value,
      filters,
      params.value?.[0].sorter ?? null,
    )
  }

  function onUpdateSorter(sorters: DataTableSortState | DataTableSortState[] | null) {
    const {
      params,
      pagination,
    } = fetchInst

    onTableChange(
      pagination.current.value,
      pagination.pageSize.value,
      params.value?.[0].filters ?? {},
      sorters,
    )
  }

  onMounted(() => {
    if (!manual) {
      const {
        params,
        pagination,
      } = fetchInst

      onTableChange(
        pagination.current.value,
        pagination.pageSize.value,
        params.value?.[0].filters ?? {},
        params.value?.[0].sorter ?? null,
      )
    }
  })

  return {
    ...fetchInst,
    tableProps: computed(() => {
      const {
        data,
        loading,
        pagination,
      } = fetchInst

      return {
        remote: true,
        loading: loading.value,
        data: data.value.list ?? [],
        pagination: {
          page: pagination.current.value,
          itemCount: pagination.total.value,
          pageSize: pagination.pageSize.value,
        },
        onUpdatePage,
        onUpdateSorter,
        onUpdateFilters,
        onUpdatePageSize,
      }
    }),
  }
}
