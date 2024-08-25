import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ProTreeProps } from '../props'

export interface UseCheckKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useCheckKeys(props: ProTreeProps, options: UseCheckKeysOptions) {
  const { keyToNodeMap } = options
  const checkedKeys = ref<Array<string | number>>([])

  watch(
    computed(() => props.checkedKeys),
    (keys) => { checkedKeys.value = keys ?? [] },
    { immediate: true },
  )

  function doUpdateCheckedKeys(keys: Array<string | number>, ...args: any[]) {
    const {
      onUpdateCheckedKeys,
      'onUpdate:checkedKeys': _onUpdateCheckedKeys,
    } = props

    checkedKeys.value = keys
    onUpdateCheckedKeys && (onUpdateCheckedKeys as any)(keys, ...args)
    _onUpdateCheckedKeys && (_onUpdateCheckedKeys as any)(keys, ...args)
  }

  function getCheckedKeys() {
    return checkedKeys.value
  }

  function setCheckedKeys(keys?: Array<string | number>) {
    const map = keyToNodeMap.value
    if (keys) {
      keys = keys.filter(k => map.get(k))
    }
    checkedKeys.value = keys ?? [...map.keys()]
  }

  return {
    checkedKeys,
    getCheckedKeys,
    setCheckedKeys,
    doUpdateCheckedKeys,
  }
}
