import type { TreeOption } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProTreeProps } from '../props'
import { get, has, isNumber, isString, set } from 'lodash-es'
import { eachTree, mapTree } from 'pro-composables'
import { computed, nextTick, ref, watch } from 'vue'

export const levelKey = '__level__'
export function useTreeData(props: ComputedRef<ProTreeProps>) {
  const treeData = ref<TreeOption[]>([])

  const keyToNodeMap = computed(() => {
    const {
      keyField = 'key',
      childrenField = 'children',
    } = props.value
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
    () => props.value.data,
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
    } = props.value

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
