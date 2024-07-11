import { computed, ref, toRef, watch } from 'vue'
import { eachTree, mapTree, useRequest } from 'pro-components-hooks'
import { debounce, get, has, isArray, isNumber, isString, set, unset } from 'lodash-es'
import type { TreeOption, TreeSelectOption } from 'naive-ui'
import type { AnyFn } from '../types'
import type { ProTreeProps } from './props'
import { LevelKey } from './key'

export function useTreeData(props: ProTreeProps) {
  const loaded = ref(false)
  const treeData = ref<TreeOption[]>([])
  const controls = useRequest(props.fetchConfig as any)
  const debounceTime = props.fetchConfig?.debounceTime ?? 500

  const {
    remote = false,
    keyField = 'key',
    leafField = 'isLeaf',
    childrenField = 'children',
    filterEmptyChildrenField = true,
    emptyChildrenConsideredLeafNode = true,
  } = props

  const {
    run,
    data,
    loading,
    onSuccess,
    onFailure,
  } = controls

  const debounceRun = debounce(
    run,
    debounceTime,
  )

  watch(
    toRef(props, 'data'),
    (propTreeData = []) => treeData.value = normalizeTreeData(propTreeData),
    { immediate: true, deep: true },
  )

  function normalizeNode(node: TreeOption, level: number) {
    const shallowNode = { ...node }
    if (!has(shallowNode, LevelKey)) {
      set(shallowNode, LevelKey, level)
    }
    if (remote && !has(shallowNode, leafField)) {
      shallowNode.isLeaf = false
    }
    if (filterEmptyChildrenField && isEmptyChildren(shallowNode)) {
      unset(shallowNode, childrenField)
    }
    return shallowNode
  }

  function normalizeTreeData(data: TreeOption[]) {
    data = isArray(data) ? data : []
    return mapTree(
      data,
      (node, _, { level }) => normalizeNode(node, level),
      childrenField,
    )
  }

  const keyToTreeNodeMap = computed(() => {
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

  const getLoading = computed(() => {
    return loaded.value ? false : loading.value
  })

  async function callWithLoaded<T extends AnyFn>(fn: T, ...args: any[]) {
    try {
      loaded.value = true
      return await fn(...args)
    }
    finally {
      loaded.value = false
    }
  }

  function isEmptyChildren(item: any) {
    const children = get(item, childrenField, [])
    return !isArray(children) || children.length <= 0
  }

  function onLoad(node: TreeSelectOption) {
    const { onLoad: propOnLoad } = props
    if (propOnLoad) {
      return callWithLoaded(propOnLoad, node)
    }
    /**
     * remote：true 并且用户没重写 onLoad，由内部控制远程加载
     */
    return new Promise<void>(async (resolve) => {
      const [err, response] = await callWithLoaded(debounceRun, node)
      if (err) {
        node.isLeaf = true
        resolve()
        return
      }

      let children = isArray(response) ? response : []
      if (emptyChildrenConsideredLeafNode) {
        children = children.map((node) => {
          const isLeaf = isEmptyChildren(node)
          return {
            isLeaf,
            ...node,
          }
        })
      }
      set(node, childrenField, children)
      resolve()
    })
  }

  onSuccess((response) => {
    if (!loaded.value) {
      treeData.value = normalizeTreeData(response)
    }
  })

  onFailure(() => {
    if (!loaded.value) {
      const vals = data.value
      treeData.value = normalizeTreeData(vals)
    }
  })

  return {
    controls,
    data: treeData,
    keyToTreeNodeMap,
    loading: getLoading,
    onLoad,
  }
}
