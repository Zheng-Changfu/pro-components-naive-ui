import type { EventHookOn } from '@vueuse/core'
import type { AnyFn } from '../../types'
import type { RefreshOnWindowFocus } from '../types'
import { createEventHook, useDocumentVisibility } from '@vueuse/core'
import { isBoolean } from 'lodash-es'
import { useRoute } from 'vue-router'

export interface UseFetchDataBaseOptions<RequestFn extends AnyFn> {
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
  request?: RequestFn
  /**
   * 请求失败触发的函数
   */
  onRequestError?: (err: Error) => void
  /**
   * 请求成功触发的函数
   */
  onRequestSuccess?: (res: Awaited<ReturnType<RequestFn>>) => void
  /**
   * 请求完成后触发的函数，不论成功或失败
   */
  onRequestComplete?: () => void
  /**
   * 请求成功后可以转化数据，返回值为最终的结果值
   */
  transform?: never
}

export interface UseFetchDataOptionsPassedTransform<T extends AnyFn, R> extends Omit<UseFetchDataBaseOptions<T>, 'transform'> {
  /**
   * 请求成功触发的函数，执行时机在 transform 之后
   */
  onRequestSuccess?: (res: R) => void
  /**
   * 请求成功后可以转化数据，返回值为最终的结果值
   */
  transform: (response: Awaited<ReturnType<T>>) => R
}

type PartialValue<T> = {
  [P in keyof T]: T[P] | undefined
}

export interface UseFetchDataReturned<RequestFn extends AnyFn = AnyFn> {
  loading: Ref<boolean>
  onRequestSuccess: EventHookOn
  data: Ref<PartialValue<Awaited<ReturnType<RequestFn>>>>
  reload: (params?: any) => Promise<void>
}

export function useFetchData<T extends AnyFn>(options: ComputedRef<UseFetchDataBaseOptions<T>>): UseFetchDataReturned<T>
export function useFetchData<T extends AnyFn, R>(options: ComputedRef<UseFetchDataOptionsPassedTransform<T, R>>): UseFetchDataReturned<T>
export function useFetchData<T extends AnyFn, R>(options: ComputedRef<UseFetchDataBaseOptions<T> | UseFetchDataOptionsPassedTransform<T, R>>): UseFetchDataReturned<T> {
  const {
    transform,
    onRequestError,
    onRequestSuccess,
    onRequestComplete,
    receiveRouteQueryParams = false,
    refreshOnWindowFocus = { intervalTime: 3000 },
  } = options.value

  const route = useRoute()
  const loading = ref(false)
  const data = ref({} as any)
  let prevNow = performance.now()
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

  async function fetchData(params: any = {}) {
    if (!options.value.request || loading.value)
      return
    try {
      loading.value = true
      const routeParams = receiveRouteQueryParams ? routeQueryParams.value : undefined
      const requestParams = {
        ...(routeParams ?? {}),
        ...(params ?? {}),
      }
      let res = (await options.value.request(requestParams)) ?? {}
      if (transform) {
        res = transform(res)
      }
      data.value = res
      triggerSuccess(toRaw(res))
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
    computed(() => options.value.manual),
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
    if (options.value.manual) {
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
