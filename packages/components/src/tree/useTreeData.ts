import { computed, onMounted } from 'vue'
import { eachTree, useRequest } from 'pro-components-hooks'
import { get, isArray, isNumber, isString, set, unset } from 'lodash-es'
import { useTimeoutFn, useVModel } from '@vueuse/core'
import type { TreeOption, TreeSelectOption } from 'naive-ui'
import type { ProTreeProps } from './props'

export function useTreeData(props: ProTreeProps) {
  const fetchImmediate = props.fetchConfig?.immediate ?? true

  const controls = useRequest({
    ...props.fetchConfig,
    immediate: false,
  } as any)

  const treeData = useVModel(
    props,
    'data',
    undefined,
    { passive: true, shouldEmit: () => false },
  )

  const {
    remote = false,
    keyField = 'key',
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

  const normalizedData = computed(() => {
    if (remote || !filterEmptyChildrenField) {
      return treeData.value
    }
    eachTree(
      treeData.value ?? [],
      (item) => {
        if (isEmptyChildren(item)) {
          unset(item, childrenField)
        }
      },
      childrenField,
    )
    return treeData.value
  })

  const keyToTreeNodeMap = computed(() => {
    const map = new Map<string | number, TreeOption>()
    eachTree(
      treeData.value ?? [],
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

  function isEmptyChildren(item: any) {
    const children = get(item, childrenField, [])
    return !isArray(children) || children.length <= 0
  }

  function onLoad(node: TreeSelectOption) {
    const { onLoad: userOnLoad } = props
    if (userOnLoad) {
      return userOnLoad(node)
    }
    /**
     * remote：true 并且用户没重写 onLoad，由内部控制远程加载
     */
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<void>(async (resolve) => {
      const [err, response] = await run(node)
      if (err) {
        node.isLeaf = true
        resolve()
        return
      }

      const isLeaf = emptyChildrenConsideredLeafNode && isEmptyChildren(response)
      const childNode = { isLeaf, ...response }
      set(node, childrenField, childNode)
      resolve()
    })
  }

  onSuccess((response) => {
    treeData.value = isArray(response) ? response : []
  })

  onFailure(() => {
    const vals = data.value
    treeData.value = isArray(vals) ? vals : []
  })

  onMounted(() => {
    if (!remote && fetchImmediate) {
      /**
       * 保持 useRequest 原来的逻辑
       */
      useTimeoutFn(run, 16)
    }
  })

  return {
    loading,
    controls,
    keyToTreeNodeMap,
    data: normalizedData,
    onLoad,
  }
}
