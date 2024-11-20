import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'

export function useLoading(props: ComputedRef<ProDataTableProps>) {
  const loading = ref(false)

  function setLoading(v: boolean) {
    loading.value = v
  }

  watchImmediate(
    () => props.value.loading,
    (value) => {
      loading.value = value ?? false
    },
  )

  return {
    setLoading,
    loading: computed(() => loading.value),
  }
}
