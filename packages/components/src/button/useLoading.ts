import { useVModel } from '@vueuse/core'
import { isArray, isFunction } from 'lodash-es'
import { nextTick } from 'vue'
import type { ProButtonProps } from './props'

export function useLoading(props: ProButtonProps) {
  const loading = useVModel(props, 'loading', undefined, {
    passive: true,
    shouldEmit: () => false,
  })

  function setLoading(v: boolean) {
    loading.value = v as any
  }

  function clickLoading(event: MouseEvent) {
    const {
      autoLoading,
      onClick: propOnClick,
    } = props

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
