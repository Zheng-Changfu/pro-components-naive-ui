import type { ComputedRef } from 'vue'
import type { ProTreeProps } from '../props'
import { watchImmediate } from '@vueuse/core'
import { computed, ref } from 'vue'
import { call } from '../../_utils/call'

export interface UseSelectKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useSelectKeys(props: ComputedRef<ProTreeProps>, options: UseSelectKeysOptions) {
  const { keyToNodeMap } = options
  const selectedKeys = ref<Array<string | number>>([])

  watchImmediate(
    computed(() => props.value.selectedKeys),
    (keys) => { selectedKeys.value = keys ?? [] },
  )

  function doUpdateSelectedKeys(keys: Array<string & number>, option?: any, meta?: any) {
    const {
      onUpdateSelectedKeys,
      'onUpdate:selectedKeys': _onUpdateSelectedKeys,
    } = props.value

    selectedKeys.value = keys
    onUpdateSelectedKeys && call(onUpdateSelectedKeys, keys, option, meta)
    _onUpdateSelectedKeys && call(_onUpdateSelectedKeys, keys, option, meta)
  }

  function getSelectedKeys() {
    return selectedKeys.value
  }

  function setSelectedKeys(keys?: Array<string | number>) {
    const map = keyToNodeMap.value
    if (keys) {
      keys = keys.filter(k => map.get(k))
    }
    selectedKeys.value = keys ?? [...map.keys()]
  }

  return {
    selectedKeys,
    getSelectedKeys,
    setSelectedKeys,
    doUpdateSelectedKeys,
  }
}
