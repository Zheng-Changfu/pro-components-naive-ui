import type { TreeSelectProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import { ref, watchEffect } from 'vue'
import { call } from '../../../../../_utils/call'

export interface UseIndeterminateKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useIndeterminateKeys(
  props: TreeSelectProps,
  options: UseIndeterminateKeysOptions,
) {
  const { keyToNodeMap } = options
  const indeterminateKeys = ref<Array<string | number>>([])

  function doUpdateIndeterminateKeys(keys: Array<string & number>, option?: any) {
    const {
      onUpdateIndeterminateKeys,
      'onUpdate:indeterminateKeys': _onUpdateIndeterminateKeys,
    } = props

    indeterminateKeys.value = keys
    onUpdateIndeterminateKeys && call(onUpdateIndeterminateKeys, keys, option)
    _onUpdateIndeterminateKeys && call(_onUpdateIndeterminateKeys, keys, option)
  }

  function getIndeterminateKeys() {
    return indeterminateKeys.value
  }

  function setIndeterminateKeys(keys: Array<string | number>) {
    const map = keyToNodeMap.value
    if (keys) {
      keys = keys.filter(k => map.get(k))
    }
    indeterminateKeys.value = keys
  }

  watchEffect(() => {
    const values = props.indeterminateKeys
    indeterminateKeys.value = values ?? []
  })

  return {
    indeterminateKeys,
    getIndeterminateKeys,
    setIndeterminateKeys,
    doUpdateIndeterminateKeys,
  }
}
