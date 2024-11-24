import type { TreeSelectOption, TreeSelectProps } from 'naive-ui'
import { get, has, isNumber, isString, set } from 'lodash-es'
import { eachTree, mapTree } from 'pro-composables'
import { computed, nextTick, ref, watch } from 'vue'

export const levelKey = '__level__'
export function useOptions(props: TreeSelectProps) {
  const optionsRef = ref<TreeSelectOption[]>([])

  const keyToNodeMap = computed(() => {
    const {
      keyField = 'key',
      childrenField = 'children',
    } = props
    const map = new Map<string | number, Record<string, any>>()
    eachTree(
      optionsRef.value,
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

  watch(
    () => props.options,
    value => optionsRef.value = normalizeOptions(value ?? []),
    { immediate: true, deep: true },
  )

  let updating = false
  watch(
    optionsRef,
    (value) => {
      if (!updating && props.onLoad) {
        updating = true
        optionsRef.value = normalizeOptions(value)
        nextTick(() => {
          updating = false
        })
      }
    },
    { deep: true },
  )

  function normalizeOptions(options: TreeSelectOption[]) {
    const {
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
  }

  return {
    keyToNodeMap,
    options: optionsRef,
  }
}
