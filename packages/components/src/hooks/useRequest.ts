type AnyFn = (...args: any[]) => any

export type InferResponse<Response, TransformFn extends ((response: Response) => any) | undefined> = TransformFn extends AnyFn
  ? ReturnType<TransformFn> extends infer R
  ? R
  : never
  : Response
export interface UseRequestOptions<Response, TransformFn extends ((response: Response) => any) | undefined> {
  /**
   * 初始值
   * @default undefined
   */
  initialValue?: InferResponse<Response, TransformFn>
  /**
   * 请求函数
   */
  api?: (...args: any[]) => Promise<Response>
  /**
   * 是否立即触发
   * @default true
   */
  immediate?: boolean
  /**
   * 请求成功后的提示，false 则不提示
   */
  successTip?: string | false | ((response: InferResponse<Response, TransformFn>) => string | false)
  /**
   * 请求失败后的提示，false 则不提示
   */
  failureTip?: string | false | ((error: any) => string | false)
  /**
   * 转换响应结果
   */
  transform?: TransformFn
  /**
   * 请求成功后调用的回调
   * @param response 成功后的结果，可能会被 transform 转换
   */
  onSuccess?: (response: InferResponse<Response, TransformFn>) => void
  /**
   * 请求失败后调用的回调
   * @param error 错误原因
   */
  onFailure?: (error: any) => void
}

export function useRequest<
  Response,
>(options: UseRequestOptions<Response, undefined>): void
export function useRequest<
  Response,
  TransformFn extends (response: Response) => any
>(options: UseRequestOptions<Response, TransformFn>): void
export function useRequest<
  Response,
  TransformFn extends AnyFn
>(options: UseRequestOptions<Response, TransformFn>) { }

function req() {
  return new Promise<{ a: number, b: number }>((resolve, reject) => {
    setTimeout(() => {
      resolve({ a: 1, b: 2 })
    }, 1000)
  })
}

useRequest({
  api: req,
  // transform:(res) => res.a,
  // onSuccess:(res) => 
})


