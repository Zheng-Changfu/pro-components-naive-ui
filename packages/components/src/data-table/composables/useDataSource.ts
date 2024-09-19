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
  setLoading: (v: boolean) => void
}
export function useDataSource(props: ComputedRef<ProDataTableProps>, options: UseDataSourceOptions) {
  const fields = useFieldSetting(props)

  const fetchDataOptions = computed<UseFetchDataBaseOptions<any>>(() => {
    return {
      request() {

      },
      transform(res) {

      },
      onRequestSuccess(res) {

      },
      onRequestError(err) {

      },
    }
  })

  const {
    reload,
    data: fetchedData,
    loading: fetchLoading,
  } = useFetchData(fetchDataOptions)

  const {
    setLoading,
  } = options

  const data = ref<Record<string, any>[]>([])

  watchImmediate(
    computed(() => props.value.data ?? []),
    v => isArray(v) && (data.value = v),
  )

  watch(
    fetchedData,
    v => isArray(v) && (data.value = v),
  )

  watch(
    fetchLoading,
    setLoading,
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
    resolveRowKey,
    rowKeyToRowMap,
  }
}
