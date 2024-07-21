import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ExcludeExpression } from 'pro-components-hooks'
import type { ProTreeSelectProps } from './props'

export interface UseIndeterminateKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToTreeSelectNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useIndeterminateKeys(
  parsedFieldProps: ComputedRef<ExcludeExpression<ProTreeSelectProps['fieldProps']>>,
  options: UseIndeterminateKeysOptions,
) {
  const { keyToTreeSelectNodeMap } = options
  const indeterminateKeys = ref<Array<string | number>>([])

  watch(
    computed(() => parsedFieldProps.value?.indeterminateKeys ?? []),
    keys => indeterminateKeys.value = keys ?? [],
    { immediate: true },
  )

  function doUpdateIndeterminateKeys(keys: Array<string | number>, ...args: any[]) {
    const {
      onUpdateIndeterminateKeys,
      'onUpdate:indeterminateKeys': _onUpdateIndeterminateKeys,
    } = parsedFieldProps.value ?? {}

    indeterminateKeys.value = keys
    onUpdateIndeterminateKeys && (onUpdateIndeterminateKeys as any)(keys, ...args)
    _onUpdateIndeterminateKeys && (_onUpdateIndeterminateKeys as any)(keys, ...args)
  }

  function getIndeterminateKeys() {
    return indeterminateKeys.value
  }

  function setIndeterminateKeys(keys: Array<string | number>) {
    const map = keyToTreeSelectNodeMap.value
    if (keys) {
      keys = keys.filter(k => map.get(k))
    }
    indeterminateKeys.value = keys
  }

  return {
    indeterminateKeys,
    getIndeterminateKeys,
    setIndeterminateKeys,
    doUpdateIndeterminateKeys,
  }
}
