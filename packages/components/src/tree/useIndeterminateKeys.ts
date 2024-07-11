import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ProTreeProps } from './props'

export interface UseIndeterminateKeysOptions {
  /**
   * key 对应树节点的映射表
   */
  keyToTreeNodeMap: ComputedRef<Map<string | number, Record<string, any>>>
}
export function useIndeterminateKeys(
  props: ProTreeProps,
  options: UseIndeterminateKeysOptions,
) {
  const { keyToTreeNodeMap } = options
  const indeterminateKeys = ref<Array<string | number>>([])

  watch(
    computed(() => props.indeterminateKeys),
    (keys) => { indeterminateKeys.value = keys ?? [] },
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
    const map = keyToTreeNodeMap.value
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
