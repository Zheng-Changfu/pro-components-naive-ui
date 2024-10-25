import type { ProDataTableProps } from '../props'
import { watchEffect } from 'vue'

export function useLoading(props: ComputedRef<ProDataTableProps>) {
  const loading = ref(false)

  function setLoading(v: boolean) {
    loading.value = v
  }

  watchEffect(() => {
    const value = props.value.loading
    loading.value = value ?? false
  })

  return {
    setLoading,
    loading: computed(() => loading.value),
  }
}
