import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ExcludeExpression } from 'pro-components-hooks'
import type { ProTreeSelectProps } from './props'

export interface UseExpandKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToTreeSelectNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useExpandKeys(
  parsedFieldProps: ComputedRef<ExcludeExpression<ProTreeSelectProps['fieldProps']>>,
  options: UseExpandKeysOptions,
) {
  const { keyToTreeSelectNodeMap } = options
  const expandedKeys = ref<Array<string | number>>([])

  watch(
    computed(() => parsedFieldProps.value?.expandedKeys ?? []),
    keys => expandedKeys.value = keys ?? [],
    { immediate: true },
  )

  function doUpdateExpandedKeys(keys: Array<string | number>, ...args: any[]) {
    const {
      onUpdateExpandedKeys,
      'onUpdate:expandedKeys': _onUpdateExpandedKeys,
    } = parsedFieldProps.value ?? {}

    expandedKeys.value = keys
    onUpdateExpandedKeys && (onUpdateExpandedKeys as any)(keys, ...args)
    _onUpdateExpandedKeys && (_onUpdateExpandedKeys as any)(keys, ...args)
  }

  function getExpandedKeys() {
    return expandedKeys.value
  }

  function setExpandedKeys(keys?: Array<string | number>) {
    const map = keyToTreeSelectNodeMap.value
    const allKeys = [...map.keys()]
    if (keys) {
      keys = keys.filter(k => map.get(k))
    }
    expandedKeys.value = keys ?? allKeys
  }

  return {
    expandedKeys,
    getExpandedKeys,
    setExpandedKeys,
    doUpdateExpandedKeys,
  }
}
