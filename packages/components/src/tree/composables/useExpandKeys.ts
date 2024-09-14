import type { ComputedRef } from 'vue'
import type { ProTreeProps } from '../props'
import { computed, ref, watch } from 'vue'

export interface UseExpandKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useExpandKeys(props: ProTreeProps, options: UseExpandKeysOptions) {
  const { keyToNodeMap } = options
  const expandedKeys = ref<Array<string | number>>([])

  watch(
    computed(() => props.expandedKeys),
    (keys) => { expandedKeys.value = keys ?? [] },
    { immediate: true },
  )

  function doUpdateExpandedKeys(keys: Array<string | number>, ...args: any[]) {
    const {
      onUpdateExpandedKeys,
      'onUpdate:expandedKeys': _onUpdateExpandedKeys,
    } = props

    expandedKeys.value = keys
    onUpdateExpandedKeys && (onUpdateExpandedKeys as any)(keys, ...args)
    _onUpdateExpandedKeys && (_onUpdateExpandedKeys as any)(keys, ...args)
  }

  function getExpandedKeys() {
    return expandedKeys.value
  }

  function setExpandedKeys(keys?: Array<string | number>) {
    const map = keyToNodeMap.value
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
