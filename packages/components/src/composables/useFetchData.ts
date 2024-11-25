import type { EmptyObject } from 'type-fest'
import type { Ref } from 'vue'
import { useDocumentVisibility } from '@vueuse/core'
import { onMounted, ref, toRaw, toValue, watch } from 'vue'

/**
 * TODO: 请求竞态问题
 */

export type RefreshOnWindowFocus = false | {
  intervalTime: number
}

export interface UseFetchDataOptions<Data = any, Params extends object = EmptyObject> {
  /**
   * 是否手动调用 request，设置后不会调用 request
   * @default false
   */
  manual?: boolean
  /**
   * 是否忽略 event 参数，事件回调中的 event 参数
   * @default true
   */
  ignoreEventParams?: boolean
  /**
   * 屏幕聚焦刷新请求，默认为 15 秒（单位 ms）
   */
  refreshOnWindowFocus?: RefreshOnWindowFocus
  /**
   * 额外的参数，当 params 的值发生变化后重新执行，不被 manual 控制
   * 这个参数的优先级最高，会覆盖 reload 的参数
   */
  params?: Params | (() => Params)
  /**
   * 请求函数
   */
  request?: (...args: any[]) => Promise<Data>
  /**
   * 请求失败触发的函数
   */
  onRequestError?: (err: Error) => void
  /**
   * 请求成功触发的函数
   */
  onRequestSuccess?: (res: Data) => void
  /**
   * 请求完成后触发的函数，不论成功或失败
   */
  onRequestComplete?: () => void
}

export interface UseFetchDataReturn<Data = any> {
  loading: Ref<boolean>
  data: Ref<Data | undefined>
  reload: (params?: any) => Promise<void>
}

export function useFetchData<Data = any>(options: UseFetchDataOptions<Data>): UseFetchDataReturn<Data> {
  const {
    params,
    request,
    manual = false,
    onRequestError,
    onRequestSuccess,
    onRequestComplete,
    ignoreEventParams = true,
    refreshOnWindowFocus = { intervalTime: 15000 },
  } = options

  const data = ref<Data>()
  const loading = ref(false)
  const visibility = useDocumentVisibility()

  async function fetchData(payload?: any) {
    if (!request)
      return
    try {
      loading.value = true
      const res = data.value = await request({
        ...(payload ?? {}),
        ...(toValue(params) ?? {}),
      })
      onRequestSuccess && onRequestSuccess(toRaw(res))
    }
    catch (error) {
      data.value = undefined
      if (!onRequestError) {
        throw new Error(error as string)
      }
      onRequestError(error as Error)
    }
    finally {
      loading.value = false
      onRequestComplete && onRequestComplete()
    }
  }

  let prevNow = performance.now()
  watch(
    visibility,
    (current, previous) => {
      if (refreshOnWindowFocus && current === 'visible' && previous === 'hidden') {
        const { intervalTime } = refreshOnWindowFocus
        if (intervalTime <= 0) {
          fetchData()
          return
        }
        const now = performance.now()
        if (now - prevNow >= intervalTime) {
          fetchData()
          prevNow = now
        }
      }
    },
  )

  watch(
    () => toValue(params),
    () => fetchData(),
  )

  onMounted(() => {
    !manual && fetchData()
  })

  function reload(params?: any) {
    const isEvent = params instanceof Event
    return fetchData(isEvent && ignoreEventParams ? {} : params)
  }

  return {
    data,
    reload,
    loading,
  }
}
