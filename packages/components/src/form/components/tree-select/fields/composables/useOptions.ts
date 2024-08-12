import { get, has, isNumber, isString, set } from 'lodash-es'
import type { TreeSelectOption, TreeSelectProps } from 'naive-ui'
import { eachTree, mapTree } from 'pro-components-hooks'

export const levelKey = Symbol('level')
export function useOptions(props: TreeSelectProps) {
  const keyToNodeMap = computed(() => {
    const {
      options = [],
      keyField = 'key',
      childrenField = 'children',
    } = props
    const map = new Map<string | number, Record<string, any>>()
    eachTree(
      options,
      (node) => {
        const key = get(node, keyField)
        if (isString(key) || isNumber(key)) {
          map.set(key, node)
        }
      },
      childrenField,
    )
    return map
  })

  const normalizedOptions = computed<TreeSelectOption[]>(() => {
    const {
      options = [],
      childrenField = 'children',
    } = props
    return mapTree(
      options,
      (node, _, { level }) => {
        const shallowNode = { ...node }
        if (!has(shallowNode, levelKey)) {
          set(shallowNode, levelKey, level)
        }
        return shallowNode
      },
      childrenField,
    )
  })

  return {
    keyToNodeMap,
    options: normalizedOptions,
  }
}
