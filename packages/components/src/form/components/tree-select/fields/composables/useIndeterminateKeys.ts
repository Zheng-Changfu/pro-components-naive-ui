import type { TreeSelectProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'

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

  watch(
    computed(() => props.indeterminateKeys ?? []),
    keys => indeterminateKeys.value = keys ?? [],
    { immediate: true },
  )

  function doUpdateIndeterminateKeys(keys: Array<string | number>, ...args: any[]) {
    const {
      onUpdateIndeterminateKeys,
      'onUpdate:indeterminateKeys': _onUpdateIndeterminateKeys,
    } = props

    indeterminateKeys.value = keys
    onUpdateIndeterminateKeys && (onUpdateIndeterminateKeys as any)(keys, ...args)
    _onUpdateIndeterminateKeys && (_onUpdateIndeterminateKeys as any)(keys, ...args)
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

  return {
    indeterminateKeys,
    getIndeterminateKeys,
    setIndeterminateKeys,
    doUpdateIndeterminateKeys,
  }
}
