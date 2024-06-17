import { type ComputedRef, computed, ref, watch } from 'vue'
import type { ExcludeExpression } from 'pro-components-hooks'
import { get, isArray } from 'lodash-es'
import type { ProCheckboxGroupProps } from './props'

export function useOptions(
  props: ProCheckboxGroupProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProCheckboxGroupProps['fieldProps']>>,
) {
  const options = ref<any[]>([])

  watch(
    computed(() => compiledFieldProps.value?.options),
    (vals) => {
      options.value = isArray(vals) ? vals : []
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

  return {
    options: normalizedOptions,
  }
}
