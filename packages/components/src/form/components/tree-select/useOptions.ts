import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import { eachTree, mapTree } from 'pro-components-hooks'
import { get, has, isArray, isNumber, isString, set, unset } from 'lodash-es'
import type { TreeSelectOption } from 'naive-ui'
import type { AnyFn } from '../../../types'
import { useInternalScopeRequest } from '../_internal/useInternalRequest'
import { useInjectProFormInstanceContext } from '../../context'
import type { ProTreeSelectProps } from './props'
import { LevelKey } from './key'

export function useOptions(
  props: ProTreeSelectProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProTreeSelectProps['fieldProps']>>,
  field: BaseField,
) {
  const loaded = ref(false)
  const options = ref<TreeSelectOption[]>([])
  const proFormInst = useInjectProFormInstanceContext()
  const controls = useInternalScopeRequest(props.fetchConfig!, field.scope)
  const restoreValueOnFetched = props.fetchConfig?.restoreValueOnFetched ?? true

  const {
    remote = false,
    keyField = 'key',
    leafField = 'isLeaf',
    childrenField = 'children',
    filterEmptyChildrenField = true,
  } = compiledFieldProps.value!

  const {
    run,
    data,
    loading,
    onSuccess,
    onFailure,
  } = controls

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

  function normalizeTreeSelectOptions(data: TreeSelectOption[], startLevel = 0) {
    data = isArray(data) ? data : []
    return mapTree(
      data,
      (node, _, { level }) => normalizeNode(node, startLevel + level),
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
      const [err, response] = await callWithLoaded(run, node)
      if (err) {
        node.isLeaf = true
        resolve()
        return
      }

      const children = normalizeTreeSelectOptions(response, node[LevelKey as any] as number)
      if (children.length <= 0) {
        node.isLeaf = true
      }
      set(node, childrenField, children)
      resolve()
    })
  }

  function tryRestoreValue() {
    if (
      restoreValueOnFetched
      && proFormInst
      && field.stringPath.value
    ) {
      proFormInst.restoreFieldValue(field.stringPath.value)
    }
  }

  function setOptions(opts: any[]) {
    options.value = normalizeTreeSelectOptions(opts)
  }

  onSuccess((response) => {
    if (!loaded.value) {
      options.value = normalizeTreeSelectOptions(response)
      tryRestoreValue()
    }
  })

  onFailure(() => {
    if (!loaded.value) {
      const vals = data.value
      options.value = normalizeTreeSelectOptions(vals)
      tryRestoreValue()
    }
  })

  return {
    options,
    controls,
    loading: getLoading,
    keyToTreeSelectNodeMap,
    onLoad,
    setOptions,
  }
}
