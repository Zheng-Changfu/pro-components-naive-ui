import type { ProDataTableProps } from '../props'
import { watchImmediate } from '@vueuse/core'

export function useLoading(props: ComputedRef<ProDataTableProps>) {
  const loading = ref(false)

  watchImmediate(
    computed(() => props.value.loading),
    v => loading.value = v ?? false,
  )

  function setLoading(v: boolean) {
    loading.value = v
  }

  return {
    setLoading,
    loading: computed(() => loading.value),
  }
}
