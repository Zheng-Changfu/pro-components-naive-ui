import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import type { ProRadioGroupProps } from './props'
import { get, isArray } from 'lodash-es'
import { computed, type ComputedRef, ref, watch } from 'vue'
import { useInternalRequest } from '../_internal/useInternalRequest'

export function useOptions(
  props: ProRadioGroupProps,
  parsedFieldProps: ComputedRef<ExcludeExpression<ProRadioGroupProps['fieldProps']>>,
  field: BaseField,
) {
  const options = ref<any[]>([])
  const controls = useInternalRequest(field, props.fetchConfig as any)

  const {
    data,
    loading,
    onSuccess,
    onFailure,
  } = controls

  watch(
    computed(() => parsedFieldProps.value?.options),
    (propOptions) => { options.value = isArray(propOptions) ? propOptions : [] },
    { immediate: true, deep: true },
  )

  const normalizedOptions = computed(() => {
    const {
      labelField = 'label',
      valueField = 'value',
    } = parsedFieldProps.value ?? {}

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
    loading,
    controls,
    setOptions,
    options: normalizedOptions,
  }
}
