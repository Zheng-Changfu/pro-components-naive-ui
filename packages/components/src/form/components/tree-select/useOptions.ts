import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ExcludeExpression, ExpressionScope } from 'pro-components-hooks'
import { eachTree, mapTree } from 'pro-components-hooks'
import { debounce, get, has, isArray, isNumber, isString, set, unset } from 'lodash-es'
import type { TreeSelectOption } from 'naive-ui'
import type { AnyFn } from '../../../types'
import { useInternalScopeRequest } from '../_internal/useInternalRequest'
import type { ProTreeSelectProps } from './props'
import { LevelKey } from './key'

export function useOptions(
  props: ProTreeSelectProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProTreeSelectProps['fieldProps']>>,
  scope: ExpressionScope,
) {
  const loaded = ref(false)
  const options = ref<TreeSelectOption[]>([])
  const debounceTime = props.fetchConfig?.debounceTime ?? 500
  const controls = useInternalScopeRequest(props.fetchConfig!, scope)

  const {
    remote = false,
    keyField = 'key',
    leafField = 'isLeaf',
    childrenField = 'children',
    filterEmptyChildrenField = true,
    emptyChildrenConsideredLeafNode = true,
  } = compiledFieldProps.value!

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
    computed(() => compiledFieldProps.value?.options ?? []),
    (propTreeSelectOptions = []) => options.value = normalizeTreeSelectOptions(propTreeSelectOptions),
    { immediate: true, deep: true },
  )

  function normalizeNode(node: TreeSelectOption, level: number) {
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

  function normalizeTreeSelectOptions(data: TreeSelectOption[]) {
    data = isArray(data) ? data : []
    return mapTree(
      data,
      (node, _, { level }) => normalizeNode(node, level),
      childrenField,
    )
  }

  const keyToTreeSelectNodeMap = computed(() => {
    const map = new Map<string | number, Record<string, any>>()
    eachTree(
      options.value,
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
    const { onLoad: propOnLoad } = compiledFieldProps.value ?? {}
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
      options.value = normalizeTreeSelectOptions(response)
    }
  })

  onFailure(() => {
    if (!loaded.value) {
      const vals = data.value
      options.value = normalizeTreeSelectOptions(vals)
    }
  })

  return {
    options,
    controls,
    loading: getLoading,
    keyToTreeSelectNodeMap,
    onLoad,
  }
}
