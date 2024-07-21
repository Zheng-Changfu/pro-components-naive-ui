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
  const parsedDepsApiGuard = useCompile(computed(() => (options.dependencies as any)?.apiGuard ?? true), { scope })

  return useRequest({
    api: parsedApi.value,
    tipApi: parsedTipApi.value,
    onFailure: parsedOnFailure.value,
    onSuccess: parsedOnSuccess.value,
    transform: parsedTransform.value,
    immediate: parsedImmediate.value,
    successTip: parsedSuccessTip.value,
    failureTip: parsedFailureTip.value,
    initialValue: parsedInitialValue.value,
    dependencies: { watch: parsedDepsWatch, apiGuard: parsedDepsApiGuard },
  })
}
