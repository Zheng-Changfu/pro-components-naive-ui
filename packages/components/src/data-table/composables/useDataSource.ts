import type { PaginationProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { UseFetchDataBaseOptions } from '../../composables/useFetchData'
import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { get, isArray, isFunction, isString, toString } from 'lodash-es'
import { eachTree } from 'pro-components-hooks'
import { toRaw } from 'vue'
import { useFetchData } from '../../composables/useFetchData'
import { useFieldSetting } from './useFieldSetting'

interface UseDataSourceOptions {
  pagination: ComputedRef<PaginationProps | false>
  getFieldsTransformedValue: () => Record<string, any>
  setPagination: (v: PaginationProps | false) => void
}
export function useDataSource(props: ComputedRef<ProDataTableProps>, options: UseDataSourceOptions) {
  const fields = useFieldSetting(props)
  const data = ref<Record<string, any>[]>([])

  const {
    pagination,
    setPagination,
    getFieldsTransformedValue,
  } = options

  const useSearchForm = computed(() => {
    const { searchForm } = props.value
    return !!searchForm && (searchForm.columns ?? []).length > 0
  })

  const searchValuesOnRequest = computed(() => {
    return useSearchForm.value
      ? getFieldsTransformedValue()
      : {}
  })

  const paginationInfoOnRequest = computed<PaginationProps>(() => {
    const {
      pageField,
      sizeField,
    } = fields.value

    return pagination.value === false
      ? { }
      : {
          [pageField]: pagination.value.page!,
          [sizeField]: pagination.value.pageSize!,
        }
  })

  const fetchDataOptions = computed<UseFetchDataBaseOptions<any>>(() => {
    if (!props.value.request)
      return {}
    let requestParams = {}
    return {
      ...props.value,
      request(opts = {}) {
        const params = {
          ...searchValuesOnRequest.value,
          ...paginationInfoOnRequest.value,
          ...opts,
        }
        requestParams = opts
        return props.value.request?.(params)
      },
      onRequestSuccess(res) {
        const { onRequestSuccess } = props.value

        const {
          pageField,
          listField,
          totalField,
        } = fields.value

        const list = Array.isArray(res) ? res : get(res, listField)
        data.value = Array.isArray(list) ? list : []

        const total = Array.isArray(res) ? res.length : get(res, totalField)
        const itemCount = Number.isNaN(Number(total)) ? 0 : Number(total)
        setPagination({ itemCount })

        const page = get(res, pageField) ?? get(requestParams, pageField)
        page && setPagination({ page })

        onRequestSuccess && onRequestSuccess(res)
      },
      onRequestError(err) {
        data.value = []
        setPagination({ itemCount: 0 })
        if (!props.value.onRequestError) {
          throw err
        }
        props.value.onRequestError(err)
      },
    }
  })

  const {
    reload,
    loading: fetchLoading,
  } = useFetchData(fetchDataOptions)

  watchImmediate(
    computed(() => props.value.data ?? []),
    v => isArray(v) && (data.value = v),
  )

  const rowKeyToRowMap = computed(() => {
    const result = new Map<string, Record<PropertyKey, any>>()

    eachTree(
      data.value,
      (row) => {
        const rowKey = toString(resolveRowKey(row))
        result.set(rowKey, toRaw(row))
      },
      props.value.childrenKey ?? 'children',
    )

    return result
  })

  function resolveRowKey(row: any) {
    const rowKey = props.value.rowKey
    if (isString(rowKey)) {
      return get(row, rowKey)
    }
    if (isFunction(rowKey)) {
      return rowKey(row)
    }
  }

  return {
    data,
    reload,
    fetchLoading,
    resolveRowKey,
    rowKeyToRowMap,
  }
}
