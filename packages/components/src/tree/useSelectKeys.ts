import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { TreeOption } from 'naive-ui'
import type { ProTreeProps } from './props'

export interface UseSelectKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToTreeNodeMap: ComputedRef<Map<string | number, TreeOption>>
}
export function useSelectKeys(props: ProTreeProps, options: UseSelectKeysOptions) {
  const { keyToTreeNodeMap } = options
  const selectedKeys = ref<Array<string | number>>([])

  watch(
    computed(() => props.selectedKeys),
    (keys) => { selectedKeys.value = keys ?? [] },
    { immediate: true },
  )

  function doUpdateSelectedKeys(keys: Array<string | number>, ...args: any[]) {
    const {
      onUpdateSelectedKeys,
      'onUpdate:selectedKeys': _onUpdateSelectedKeys,
    } = props

    selectedKeys.value = keys
    onUpdateSelectedKeys && (onUpdateSelectedKeys as any)(keys, ...args)
    _onUpdateSelectedKeys && (_onUpdateSelectedKeys as any)(keys, ...args)
  }

  function selectKeys(keys?: Array<string | number>) {
    const map = keyToTreeNodeMap.value
    if (keys) {
      keys = keys.filter(k => map.get(k))
    }
    selectedKeys.value = keys ?? [...map.keys()]
  }

  return {
    selectedKeys,
    selectKeys,
    doUpdateSelectedKeys,
  }
}
