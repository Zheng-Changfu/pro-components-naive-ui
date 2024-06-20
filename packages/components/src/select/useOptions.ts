import { type ComputedRef, computed, onMounted, ref, watch } from 'vue'
import type { ExcludeExpression } from 'pro-components-hooks'
import { useRequest } from 'pro-components-hooks'
import { debounce, get, isArray } from 'lodash-es'
import { useTimeoutFn } from '@vueuse/core'
import type { ProSelectProps } from './props'

export function useOptions(
  props: ProSelectProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProSelectProps['fieldProps']>>,
) {
  const options = ref<any[]>([])
  const remote = compiledFieldProps.value?.remote ?? false
  const fetchImmediate = props.fetchConfig?.immediate ?? true
  const debounceTime = props.fetchConfig?.debounceTime ?? 500
  const controls = useRequest({ ...props.fetchConfig, immediate: false } as any)

  const {
    run,
    data,
    loading,
    onSuccess,
    onFailure,
  } = controls

  const debounceRun = debounce(
    run,
    debounceTime,
  )

  watch(
    computed(() => compiledFieldProps.value?.options),
    (vals) => { options.value = isArray(vals) ? vals : [] },
    { immediate: true },
  )

  watch(
    computed(() => compiledFieldProps.value?.loading),
    (l) => {
      loading.value = l ?? false
    },
    { immediate: true },
  )

  const normalizedOptions = computed(() => {
    const {
      labelField = 'label',
      valueField = 'value',
    } = compiledFieldProps.value ?? {}

    return options.value.map((item) => {
      const label = get(item, labelField)
      const value = get(item, valueField)
      return {
        ...item,
        label,
        value,
      }
    })
  })

  function onSearch(query: string) {
    const { onSearch: userOnSearch } = compiledFieldProps.value ?? {}
    if (userOnSearch) {
      ;(userOnSearch as any)(query)
      return
    }
    if (!remote) {
      return
    }
    /**
     * remote：true 并且用户没重写 onSearch，由内部控制远程搜索
     */
    if (!query.length) {
      options.value = []
      return
    }
    debounceRun(query)
  }

  onSuccess((response) => {
    options.value = isArray(response) ? response : []
  })

  onFailure(() => {
    const vals = data.value
    options.value = isArray(vals) ? vals : []
  })

  onMounted(() => {
    if (!remote && fetchImmediate) {
      /**
       * 保持 useRequest 原来的逻辑
       */
      useTimeoutFn(run, 16)
    }
  })

  return {
    loading,
    controls,
    onSearch,
    options: normalizedOptions,
  }
}
