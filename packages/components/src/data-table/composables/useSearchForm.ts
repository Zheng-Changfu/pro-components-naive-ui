import type { ProSearchFormProps } from '../components/search-form'
import type { ProDataTableProps } from '../props'
import { computed } from 'vue'
import { useFieldSetting } from './useFieldSetting'

interface UseSearchFormOptions {
  reload: (params: any) => Promise<void>
}
export function useSearchForm(props: ComputedRef<ProDataTableProps>, options: UseSearchFormOptions) {
  const { reload } = options
  const fieldSetting = useFieldSetting(props)

  const show = computed(() => {
    const { searchForm } = props.value
    return searchForm !== false
  })

  const searchFormProps = computed(() => {
    return show.value
      ? props.value.searchForm as ProSearchFormProps
      : {}
  })

  const proSearchFormProps = computed<ProSearchFormProps>(() => {
    const {
      onReset,
      onSearch,
      ...restProps
    } = searchFormProps.value

    return {
      ...restProps,
      onSearch: (values) => {
        onSearch
          ? onSearch(values)
          : reload({ [fieldSetting.value.pageField]: 1 })
      },
      onReset: () => {
        onReset
          ? onReset()
          : reload({ [fieldSetting.value.pageField]: 1 })
      },
    }
  })

  return {
    show,
    proSearchFormProps,
  }
}
