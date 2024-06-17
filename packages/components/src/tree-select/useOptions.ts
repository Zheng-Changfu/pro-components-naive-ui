import { type ComputedRef, computed, ref, watch } from 'vue'
import type { ExcludeExpression } from 'pro-components-hooks'
import { get, isArray } from 'lodash-es'
import type { ProTreeSelectProps } from './props'

export function useOptions(
  props: ProTreeSelectProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProTreeSelectProps['fieldProps']>>,
) {
  const options = ref<any[]>([])

  watch(
    computed(() => compiledFieldProps.value?.options),
    (vals) => {
      options.value = isArray(vals) ? vals : []
    },
    { immediate: true },
  )

  return {
    options,
  }
}
