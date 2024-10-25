import type { TreeSelectProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import { ref, watchEffect } from 'vue'
import { call } from '../../../../../_utils/call'

export interface UseExpandKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useExpandKeys(
  props: TreeSelectProps,
  options: UseExpandKeysOptions,
) {
  const { keyToNodeMap } = options
  const expandedKeys = ref<Array<string | number>>([])

  function doUpdateExpandedKeys(keys: Array<string & number>, option?: any, meta?: any) {
    const {
      onUpdateExpandedKeys,
      'onUpdate:expandedKeys': _onUpdateExpandedKeys,
    } = props

    expandedKeys.value = keys
    onUpdateExpandedKeys && call(onUpdateExpandedKeys, keys, option, meta)
    _onUpdateExpandedKeys && call(_onUpdateExpandedKeys, keys, option, meta)
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

  watchEffect(() => {
    const values = props.expandedKeys
    expandedKeys.value = values ?? []
  })

  return {
    expandedKeys,
    getExpandedKeys,
    setExpandedKeys,
    doUpdateExpandedKeys,
  }
}
