import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ExcludeExpression } from 'pro-components-hooks'
import { useRequest } from 'pro-components-hooks'
import { get, isArray } from 'lodash-es'
import type { ProTransferProps } from './props'

export function useOptions(
  props: ProTransferProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProTransferProps['fieldProps']>>,
) {
  const options = ref<any[]>([])
  const controls = useRequest(props.fetchConfig as any)

  const {
    data,
    loading,
    onSuccess,
    onFailure,
  } = controls

  watch(
    computed(() => compiledFieldProps.value?.options ?? []),
    propOptions => options.value = isArray(propOptions) ? propOptions : [],
    { immediate: true, deep: true },
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

  onSuccess((response) => {
    options.value = isArray(response) ? response : []
  })

  onFailure(() => {
    const vals = data.value
    options.value = isArray(vals) ? vals : []
  })

  return {
    loading,
    controls,
    options: normalizedOptions,
  }
}
