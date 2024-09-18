import type { ComputedRef } from 'vue'
import type { UseFetchDataBaseOptions } from '../../composables/useFetchData'
import type { ProDataTableProps } from '../props'
import { isArray } from 'lodash-es'
import { useFetchData } from '../../composables/useFetchData'

interface UseDataSourceOptions {
  setLoading: (v: boolean) => void
}
export function useDataSource(props: ComputedRef<ProDataTableProps>, options: UseDataSourceOptions) {
  const fetchDataConfig = computed<UseFetchDataBaseOptions<any>>(() => {
    return {

    }
  })

  const {
    reload,
    onRequestSuccess,
    data: fetchedData,
    loading: fetchLoading,
  } = useFetchData(fetchDataConfig)

  const {
    setLoading,
  } = options

  const data = ref<Record<string, any>[]>([])

  watch(
    computed(() => props.value.data ?? []),
    v => data.value = v,
  )

  watch(
    fetchedData,
    v => isArray(v) && (data.value = v),
  )

  watch(
    fetchLoading,
    setLoading,
  )

  return {
    data,
  }
}
