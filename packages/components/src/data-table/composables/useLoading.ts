import { watchImmediate } from '@vueuse/core'
import type { MaybeRef } from 'vue'

export function useLoading(loadingProp: MaybeRef<boolean>) {
  const loading = ref(false)

  watchImmediate(
    computed(() => unref(loadingProp)),
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
