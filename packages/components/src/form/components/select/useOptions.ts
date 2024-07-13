import { type ComputedRef, computed, ref, watch } from 'vue'
import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import { debounce, isArray } from 'lodash-es'
import { useInternalScopeRequest } from '../_internal/useInternalRequest'
import { useInjectProFormInstanceContext } from '../../context'
import type { ProSelectProps } from './props'

export function useOptions(
  props: ProSelectProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProSelectProps['fieldProps']>>,
  field: BaseField,
) {
  const options = ref<any[]>([])
  const { remote = false } = compiledFieldProps.value!
  const proFormInst = useInjectProFormInstanceContext()
  const debounceTime = props.fetchConfig?.debounceTime ?? 500
  const controls = useInternalScopeRequest(props.fetchConfig!, field.scope)
  const restoreValueOnFetched = props.fetchConfig?.restoreValueOnFetched ?? true

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
    computed(() => compiledFieldProps.value!.options),
    (propSelectOptions) => { options.value = isArray(propSelectOptions) ? propSelectOptions : [] },
    { immediate: true, deep: true },
  )

  function onSearch(query: string) {
    const { onSearch: propOnSearch } = compiledFieldProps.value ?? {}
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

  function tryRestoreValue() {
    if (
      restoreValueOnFetched
      && proFormInst
      && field.stringPath.value
    ) {
      proFormInst.restoreFieldValue(field.stringPath.value)
    }
  }

  function setOptions(opts: any[]) {
    options.value = opts
  }

  onSuccess((response) => {
    options.value = isArray(response) ? response : []
    tryRestoreValue()
  })

  onFailure(() => {
    const vals = data.value
    options.value = isArray(vals) ? vals : []
    tryRestoreValue()
  })

  return {
    options,
    loading,
    controls,
    onSearch,
    setOptions,
  }
}
