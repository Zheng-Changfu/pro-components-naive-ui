import type { ComputedRef } from 'vue'
import type { ProTreeProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { computed, ref } from 'vue'
import { call } from '../../_utils/call'

export interface UseCheckKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useCheckKeys(props: ComputedRef<ProTreeProps>, options: UseCheckKeysOptions) {
  const { keyToNodeMap } = options
  const checkedKeys = ref<Array<string | number>>([])

  watchImmediate(
    computed(() => props.value.checkedKeys),
    (keys) => { checkedKeys.value = keys ?? [] },
  )

  function doUpdateCheckedKeys(keys: Array<string & number>, option?: any, meta?: any) {
    const {
      onUpdateCheckedKeys,
      'onUpdate:checkedKeys': _onUpdateCheckedKeys,
    } = props.value

    checkedKeys.value = keys
    onUpdateCheckedKeys && call(onUpdateCheckedKeys, keys, option, meta)
    _onUpdateCheckedKeys && call(_onUpdateCheckedKeys, keys, option, meta)
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
