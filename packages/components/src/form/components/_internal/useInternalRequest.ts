import type { ExpressionScope, MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { useCompile, useRequest } from 'pro-components-hooks'
import { computed } from 'vue'

/**
 * 为了让表单控件的 dependencies 支持表达式，其他属性支持表达式，但是不支持响应式
 */
export function useInternalScopeRequest(
  options: MaybeExpression<UseRequestOptions<any, any>>,
  scope: ExpressionScope,
) {
  const compiledApi = useCompile(computed(() => options.api), { scope })
  const compiledTipApi = useCompile(computed(() => options.tipApi), { scope })
  const compiledOnFailure = useCompile(computed(() => options.onFailure), { scope })
  const compiledOnSuccess = useCompile(computed(() => options.onSuccess), { scope })
  const compiledTransform = useCompile(computed(() => options.transform), { scope })
  const compiledImmediate = useCompile(computed(() => options.immediate), { scope })
  const compiledSuccessTip = useCompile(computed(() => options.successTip), { scope })
  const compiledFailureTip = useCompile(computed(() => options.failureTip), { scope })
  const compiledInitialValue = useCompile(computed(() => options.initialValue), { scope })
  const compiledDepsWatch = useCompile(computed(() => (options.dependencies as any)?.watch), { scope })
  const compiledDepsRunable = useCompile(computed(() => (options.dependencies as any)?.runable), { scope })

  return useRequest({
    api: compiledApi.value,
    tipApi: compiledTipApi.value,
    onFailure: compiledOnFailure.value,
    onSuccess: compiledOnSuccess.value,
    transform: compiledTransform.value,
    immediate: compiledImmediate.value,
    successTip: compiledSuccessTip.value,
    failureTip: compiledFailureTip.value,
    initialValue: compiledInitialValue.value,
    dependencies: { watch: compiledDepsWatch, runable: compiledDepsRunable },
  })
}
