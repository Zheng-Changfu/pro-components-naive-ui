import { computed, unref } from 'vue'
import { useInjectGlobalConfigContext } from './context'
import type { ProConfigProviderExtendProps } from './props'

export function useMergeProFormGlobalConfig<T extends ProConfigProviderExtendProps['proForm']>(props: T) {
  const { proForm } = useInjectGlobalConfigContext()
  return computed(() => {
    const {
      transition,
      readonlyRender,
      readonlyEmptyRender,
      expressionContext = {},
    } = props ?? {}

    const {
      transition: globalTransition,
      readonlyRender: globalReadonlyRender,
      readonlyEmptyRender: globalReadonlyEmptyRender,
      expressionContext: globalExpressionContext = {},
    } = unref(proForm) ?? {}

    return {
      transition: transition ?? globalTransition,
      readonlyRender: readonlyRender ?? globalReadonlyRender,
      readonlyEmptyRender: readonlyEmptyRender ?? globalReadonlyEmptyRender,
      expressionContext: { ...globalExpressionContext, ...expressionContext },
    }
  })
}

export function useMergeProTableGlobalConfig<T extends ProConfigProviderExtendProps['proTable']>(props: T) {
  const { proTable } = useInjectGlobalConfigContext()
  return computed(() => {
    return {
      ...props,
      ...(unref(proTable) ?? {}),
    }
  })
}

export function useMergeProButtonGlobalConfig<T extends ProConfigProviderExtendProps['proButton']>(props: T) {
  const { proButton } = useInjectGlobalConfigContext()
  return computed(() => {
    return {
      ...props,
      ...(unref(proButton) ?? {}),
    }
  })
}

export function useMergeProUploadGlobalConfig<T extends ProConfigProviderExtendProps['proUpload']>(props: T) {
  const { proUpload } = useInjectGlobalConfigContext()
  return computed(() => {
    return {
      ...props,
      ...(unref(proUpload) ?? {}),
    }
  })
}

export function useMergeProRequestGlobalConfig<T extends ProConfigProviderExtendProps['proRequest']>(props: T) {
  const { proRequest } = useInjectGlobalConfigContext()
  return computed(() => {
    return {
      ...props,
      ...(unref(proRequest) ?? {}),
    }
  })
}

export function useMergeProFormListGlobalConfig<T extends ProConfigProviderExtendProps['proFormList']>(props: T) {
  const { proFormList } = useInjectGlobalConfigContext()
  return computed(() => {
    return {
      ...props,
      ...(unref(proFormList) ?? {}),
    }
  })
}
