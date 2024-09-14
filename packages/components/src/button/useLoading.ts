import type { ProButtonProps } from './props'
import { watchImmediate } from '@vueuse/core'
import { isArray, isFunction } from 'lodash-es'
import { nextTick } from 'vue'

export function useLoading(props: ComputedRef<ProButtonProps>) {
  const loading = ref(false)

  watchImmediate(
    computed(() => props.value.loading),
    v => loading.value = !!v,
  )

  function setLoading(v: boolean) {
    loading.value = v as any
  }

  function clickLoading(event: MouseEvent) {
    const {
      autoLoading,
      onClick: propOnClick,
    } = props.value

    /**
     * vue 会进行事件合并
     */
    const clickQueue = isFunction(propOnClick)
      ? [propOnClick]
      : propOnClick

    if (!isArray(clickQueue))
      return

    const promises = clickQueue.reduce((p, clickFn) => {
      p.push(clickFn(event))
      return p
    }, [] as any[])

    if (autoLoading) {
      Promise.all(promises).finally(() => setLoading(false))
      /**
       * 防止同步任务耗时长出现 loading 效果
       */
      nextTick(() => {
        setLoading(true)
      })
    }
  }

  return {
    loading,
    setLoading,
    clickLoading,
  }
}
