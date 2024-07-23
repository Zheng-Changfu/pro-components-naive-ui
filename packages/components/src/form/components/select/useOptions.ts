import { type ComputedRef, computed, ref, watch } from 'vue'
import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import { debounce, isArray } from 'lodash-es'
import { useInternalRequest } from '../_internal/useInternalRequest'
import type { ProSelectProps } from './props'

export function useOptions(
  props: ProSelectProps,
  parsedFieldProps: ComputedRef<ExcludeExpression<ProSelectProps['fieldProps']>>,
  field: BaseField,
) {
  const options = ref<any[]>([])
  const { remote = false } = parsedFieldProps.value!
  const debounceTime = props.fetchConfig?.debounceTime ?? 500
  const controls = useInternalRequest(field, props.fetchConfig as any)

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
    computed(() => parsedFieldProps.value!.options),
    (propSelectOptions) => { options.value = isArray(propSelectOptions) ? propSelectOptions : [] },
    { immediate: true, deep: true },
  )

  function onSearch(query: string) {
    const { onSearch: propOnSearch } = parsedFieldProps.value ?? {}
    if (propOnSearch) {
      ;(propOnSearch as any)(query)
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

  function setOptions(opts: any[]) {
    options.value = opts
  }

  onSuccess((response) => {
    options.value = isArray(response) ? response : []
  })

  onFailure(() => {
    const vals = data.value
    options.value = isArray(vals) ? vals : []
  })

  return {
    options,
    loading,
    controls,
    onSearch,
    setOptions,
  }
}
