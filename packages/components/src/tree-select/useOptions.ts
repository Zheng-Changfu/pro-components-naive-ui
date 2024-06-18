import type { ComputedRef } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'
import type { ExcludeExpression } from 'pro-components-hooks'
import { eachTree, useRequest } from 'pro-components-hooks'
import { get, isArray, set, unset } from 'lodash-es'
import { useTimeoutFn } from '@vueuse/core'
import type { TreeSelectOption } from 'naive-ui'
import type { ProTreeSelectProps } from './props'

export function useOptions(
  props: ProTreeSelectProps,
  compiledFieldProps: ComputedRef<ExcludeExpression<ProTreeSelectProps['fieldProps']>>,
) {
  const options = ref<any[]>([])
  const fetchImmediate = props.fetchConfig?.immediate ?? true
  const childrenField = compiledFieldProps.value?.childrenField ?? 'children'
  const controls = useRequest({ ...props.fetchConfig, immediate: false } as any)

  const {
    remote = false,
    filterEmptyChildrenField = true,
    emptyChildrenConsideredLeafNode = true,
  } = compiledFieldProps.value ?? {}

  const {
    run,
    data,
    loading,
    onSuccess,
    onFailure,
  } = controls

  watch(
    computed(() => compiledFieldProps.value?.options),
    (vals) => { options.value = isArray(vals) ? vals : [] },
    { immediate: true },
  )

  watch(
    computed(() => compiledFieldProps.value?.loading),
    (l) => {
      loading.value = l ?? false
    },
    { immediate: true },
  )

  const normalizedOptions = computed(() => {
    if (remote || !filterEmptyChildrenField) {
      return options.value
    }
    eachTree(
      options.value,
      (item) => {
        if (isEmptyChildren(item)) {
          unset(item, childrenField)
        }
      },
      childrenField,
    )
    return options.value
  })

  function isEmptyChildren(item: any) {
    const children = get(item, childrenField, [])
    return !isArray(children) || children.length <= 0
  }

  function onLoad(node: TreeSelectOption) {
    const { onLoad: userOnLoad } = compiledFieldProps.value ?? {}
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
    options.value = isArray(response) ? response : []
  })

  onFailure(() => {
    const vals = data.value
    options.value = isArray(vals) ? vals : []
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
    options: normalizedOptions,
    onLoad,
  }
}
