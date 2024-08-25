import type { EventHookOn } from '@vueuse/core'
import { createEventHook, useDocumentVisibility } from '@vueuse/core'
import { isBoolean } from 'lodash-es'
import { useRoute } from 'vue-router'
import type { RefreshOnWindowFocus } from '../types'

export interface UseFetchDataOptions<ResponseData = any> {
  /**
   * 是否手动调用 request，设置后不会调用 request
   * @default false
   */
  manual?: boolean
  /**
   * 屏幕聚焦刷新请求
   * @default true
   */
  refreshOnWindowFocus?: RefreshOnWindowFocus
  /**
   * 是否接收路由的 query 和 params 参数作为请求参数
   * @default false
   */
  receiveRouteQueryParams?: boolean
  /**
   * 请求函数
   */
  request?: (params?: any) => Promise<ResponseData>
  /**
   * 请求失败触发的函数
   */
  onRequestError?: (err: Error) => void
  /**
   * 请求成功触发的函数
   */
  onRequestSuccess?: (res: ResponseData) => void
  /**
   * 请求完成后触发的函数，不论成功或失败
   */
  onRequestComplete?: () => void
}

type PartialValue<T> = {
  [P in keyof T]: T[P] | undefined
}

export interface UseFetchDataReturned<ResponseData = any> {
  loading: Ref<boolean>
  onRequestSuccess: EventHookOn
  data: Ref<PartialValue<ResponseData>>
  reload: (params?: any) => Promise<void>
}

export function useFetchData<ResponseData = any>(options: UseFetchDataOptions<ResponseData>): UseFetchDataReturned<ResponseData> {
  const {
    onRequestError,
    onRequestSuccess,
    onRequestComplete,
    receiveRouteQueryParams = false,
    refreshOnWindowFocus = { intervalTime: 3000 },
  } = options

  const route = useRoute()
  const loading = ref(false)
  let prevNow = performance.now()
  const data = ref<ResponseData>({} as any)
  const visibility = useDocumentVisibility()

  const {
    on: onSuccess,
    trigger: triggerSuccess,
  } = createEventHook()

  const routeQueryParams = computed(() => {
    return {
      ...route.query as Record<string, any>,
      ...route.params as Record<string, any>,
    }
  })

  async function fetchData(params?: any) {
    if (!options.request || loading.value)
      return
    try {
      loading.value = true
      const routeParams = receiveRouteQueryParams ? routeQueryParams.value : undefined
      const requestParams = params === undefined && routeParams === undefined
        ? undefined
        : {
            ...(routeParams ?? {}),
            ...(params ?? {}),
          }
      const res = (await options.request(requestParams)) ?? {}
      data.value = res as ResponseData
      triggerSuccess(toRaw(res) as ResponseData)
    }
    catch (error) {
      data.value = {} as any
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

  watch(
    visibility,
    (current, previous) => {
      if (refreshOnWindowFocus && current === 'visible' && previous === 'hidden') {
        const intervalTime = isBoolean(refreshOnWindowFocus) ? 0 : refreshOnWindowFocus.intervalTime
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
    toRef(options, 'manual'),
    (manual) => {
      if (manual) {
        return
      }
      fetchData()
    },
  )

  function reload(params?: any) {
    /**
     * 忽略掉事件 event
     */
    return fetchData(params instanceof Event ? {} : params)
  }

  onMounted(() => {
    if (options.manual) {
      return
    }
    fetchData()
  })

  onRequestSuccess && onSuccess(onRequestSuccess)

  return {
    reload,
    loading,
    data: data as any,
    onRequestSuccess: onSuccess,
  }
}
