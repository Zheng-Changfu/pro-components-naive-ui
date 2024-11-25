import type { EmptyObject, Merge, Simplify } from 'type-fest'
import type { emptyObjectSymbol } from 'type-fest/source/empty-object'
import type { UseFetchDataOptions } from '../../composables/useFetchData'
import type { CreateProSearchFormOptions } from '../components/search-form/composables/createProSearchForm'
import { isArray, isNumber } from 'lodash-es'
import { computed, ref } from 'vue'
import { useFetchData } from '../../composables/useFetchData'
import { createProSearchForm } from '../components/search-form'
import { useNDataTableInst } from './useNDataTableInst'

/**
 * 接管[数据源/查询表单/表格实例]的 composable
 */

export interface CreateProDataTableReturn<RowData = any> {

}

type TableDataRequest<
  RowData = any,
  Params extends object = EmptyObject,
  SearchData extends object = EmptyObject,
  SortData extends object = EmptyObject,
  FilterData extends object = EmptyObject,
> = (
  /**
   * 查询表单参数 & {page,pageSize} & params
   */
  params: Simplify<
    Omit<Merge<SearchData, Merge<{
      page: number
      pageSize: number
    }, Params>>, typeof emptyObjectSymbol>
  >,
  /**
   * 排序参数
   */
  sort: SortData,
  /**
   * 过滤参数
   */
  filter: FilterData
) => Promise<{
  data: RowData[]
  success: boolean
  itemCount?: number
}>

interface CreateProDataTableOptions<
  RowData = any,
  Params extends object = EmptyObject,
  SearchData extends object = EmptyObject,
  SortData extends object = EmptyObject,
  FilterData extends object = EmptyObject,
> extends Omit<UseFetchDataOptions, 'request'> {
  /**
   * 是否自动创建 row-key
   * @default false
   */
  autoCreateRowKey?: boolean
  /**
   * 表格每一行的 key，优先级大于 autoCreateRowKey
   */
  rowKey?: string | ((row: RowData) => string | number)
  /**
   * 请求函数
   */
  request?: TableDataRequest<RowData, Params, SearchData, SortData, FilterData>
  /**
   * 交给 createProSearchForm 的选项
   */
  searchForm?: CreateProSearchFormOptions<SearchData>
  /**
   * 同 naive-ui（树形数据下后代节点在数据中的 key）
   * @default 'children'
   */
  childrenKey?: string
  /**
   * 同 naive-ui（异步展开树形数据的回调）
   */
  onLoad?: (rowData: RowData) => Promise<void>
}

export function createProDataTable<
  RowData extends object = EmptyObject,
  Params extends object = EmptyObject,
  SearchData extends object = EmptyObject,
  SortData extends object = EmptyObject,
  FilterData extends object = EmptyObject,
>(options: Simplify<CreateProDataTableOptions<RowData, Params, SearchData, SortData, FilterData>> = {}) {
  const {
    manual,
    params,
    searchForm = {},
    ignoreEventParams,
    refreshOnWindowFocus,
    childrenKey = 'children',
    request,
    onRequestError,
    onRequestSuccess,
    onRequestComplete,
  } = options

  const {
    reload,
    loading: fetchLoading,
  } = useFetchData({
    params,
    manual,
    ignoreEventParams,
    refreshOnWindowFocus,
    onRequestComplete,
    onRequestError: fetchTableDataError,
    onRequestSuccess: fetchTableDataSuccess,
    request: request ? fetchTableData : undefined,
  })

  const {
    getSortInfo,
    getFilterInfo,
    setPaginationInfo,
    getPaginationInfo,
    proDataTableInst,
    registerProDataTableInst,
    ...proDataTableMethods
  } = useNDataTableInst()

  const form = createProSearchForm({
    ...searchForm,
    /**
     * 点击了查询
     */
    onSubmit: (values, warnings) => {
      if (searchForm.onSubmit) {
        return searchForm.onSubmit(values, warnings)
      }
      setPaginationInfo({ page: 1 })
      reload()
    },
    /**
     * 点击了重置
     */
    onReset: () => {
      if (searchForm.onReset) {
        return searchForm.onReset()
      }
      setPaginationInfo({ page: 1 })
      reload()
    },
  })

  const dataSource = ref<RowData[]>()

  const finalDataSource = computed(() => {

  })

  const rowKeyToRowMap = computed(() => {

  })

  function fetchTableData(params?: any) {
    const tablePagination = getPaginationInfo()
    const paginationInfo = tablePagination
      ? {
          page: tablePagination.page!,
          pageSize: tablePagination.pageSize!,
        }
      : {}
    const searchValues = form.getFieldsTransformedValue() as any

    return request!({
      ...searchValues,
      ...paginationInfo,
      ...(params ?? {}),
    }, getSortInfo(), getFilterInfo())
  }

  function fetchTableDataSuccess(res: Partial<Awaited<ReturnType<TableDataRequest>>>) {
    const {
      success,
      data = [],
      itemCount,
    } = res ?? {}

    if (success === false) {
      dataSource.value = []
      setPaginationInfo({
        page: 1,
        itemCount: 0,
      })
      return
    }
    const list = isArray(data) ? data : []
    dataSource.value = list
    setPaginationInfo({
      itemCount: isNumber(itemCount) ? itemCount : list.length,
    })
    onRequestSuccess && onRequestSuccess(res)
  }

  function fetchTableDataError(err: any) {
    dataSource.value = []
    setPaginationInfo({
      page: 1,
      itemCount: 0,
    })
    if (!onRequestError) {
      throw err
    }
    onRequestError(err)
  }

  const returned = {
    searchForm: form,
    loading: fetchLoading,
    data: finalDataSource,
  }

  return Object.freeze(returned)
}

const {

} = useFetchTableData()
