import type { BaseField, MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { useCompile, useRequest } from 'pro-components-hooks'
import { computed } from 'vue'
import { useInjectProFormInstance } from '../../context'

/**
 * 1. 处理表达式
 * 2. 处理 restoreValueOnFetched
 * 3. 请求中时不触发表单校验
 */
export interface UseInternalRequestOptions extends MaybeExpression<UseRequestOptions<any, any>> {
  /**
   *  请求结束后是否还原值并清空校验，防止匹配不到结果造成显示上的错误，默认 true
   */
  restoreValueOnFetched?: boolean
}
export function useInternalRequest(
  field: BaseField,
  options: UseInternalRequestOptions,
) {
  const scope = field.scope
  const proFormInst = useInjectProFormInstance()
  const restoreValueOnFetched = options.restoreValueOnFetched ?? true
  const parsedApi = useCompile(computed(() => options.api), { scope })
  const parsedTipApi = useCompile(computed(() => options.tipApi), { scope })
  const parsedOnFailure = useCompile(computed(() => options.onFailure), { scope })
  const parsedOnSuccess = useCompile(computed(() => options.onSuccess), { scope })
  const parsedTransform = useCompile(computed(() => options.transform), { scope })
  const parsedImmediate = useCompile(computed(() => options.immediate), { scope })
  const parsedSuccessTip = useCompile(computed(() => options.successTip), { scope })
  const parsedFailureTip = useCompile(computed(() => options.failureTip), { scope })
  const parsedInitialValue = useCompile(computed(() => options.initialValue), { scope })
  const parsedDepsWatch = useCompile(computed(() => (options.dependencies as any)?.watch), { scope })
  const parsedDepsGuard = useCompile(computed(() => (options.dependencies as any)?.guard ?? true), { scope })

  const exposed = useRequest({
    api: parsedApi.value,
    tipApi: parsedTipApi.value,
    onFailure: parsedOnFailure.value,
    onSuccess: parsedOnSuccess.value,
    transform: parsedTransform.value,
    immediate: parsedImmediate.value,
    successTip: parsedSuccessTip.value,
    failureTip: parsedFailureTip.value,
    initialValue: parsedInitialValue.value,
    dependencies: { watch: parsedDepsWatch, guard: parsedDepsGuard },
  })

  function restoreValue() {
    if (field.stringPath.value) {
      proFormInst.restoreFieldValue(field.stringPath.value)
    }
  }

  const run = exposed.run
  const runBool = exposed.runBool

  if (proFormInst) {
    exposed.run = (...args: any[]) => {
      proFormInst.pauseDependenciesTrigger()
      return run(...args)
    }

    exposed.runBool = (...args: any[]) => {
      proFormInst.pauseDependenciesTrigger()
      return runBool(...args)
    }

    exposed.onSuccess(proFormInst.resumeDependenciesTrigger)
    exposed.onFailure(proFormInst.resumeDependenciesTrigger)

    if (restoreValueOnFetched) {
      exposed.onSuccess(restoreValue)
      exposed.onFailure(restoreValue)
    }
  }

  return exposed
}
