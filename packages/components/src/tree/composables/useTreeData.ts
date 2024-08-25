import { computed, ref, toRef, watch } from 'vue'
import { eachTree, mapTree } from 'pro-components-hooks'
import { get, has, isNumber, isString, set } from 'lodash-es'
import type { TreeOption } from 'naive-ui'
import type { ProTreeProps } from '../props'

export const levelKey = '__level__'
export function useTreeData(props: ProTreeProps) {
  const treeData = ref<TreeOption[]>([])

  const keyToNodeMap = computed(() => {
    const {
      keyField = 'key',
      childrenField = 'children',
    } = props
    const map = new Map<string | number, Record<string, any>>()
    eachTree(
      treeData.value,
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

  let updating = false
  watch(
    toRef(props, 'data'),
    (value) => {
      updating = true
      treeData.value = normalizeData(value ?? [])
      nextTick(() => {
        updating = false
      })
    },
    { immediate: true, deep: true },
  )

  watch(
    treeData,
    (value) => {
      if (!updating) {
        updating = true
        treeData.value = normalizeData(value)
        nextTick(() => {
          updating = false
        })
      }
    },
    { deep: true },
  )

  function normalizeData(data: TreeOption[]) {
    const {
      childrenField = 'children',
    } = props
    return mapTree(
      data,
      (node, _, { level }) => {
        const shallowNode = { ...node }
        if (!has(shallowNode, levelKey)) {
          set(shallowNode, levelKey, level)
        }
        return shallowNode
      },
      childrenField,
    )
  }

  function setData(data: any[]) {
    treeData.value = data
  }

  return {
    setData,
    keyToNodeMap,
    data: treeData,
  }
}
