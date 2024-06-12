import { computed, unref } from 'vue'
import { useInjectGlobalConfigContext } from './context'
import type { ProConfigProviderExtendProps } from './props'

export function useMergeProFormGlobalConfig<T extends ProConfigProviderExtendProps['proForm']>(props: T) {
  const { proForm } = useInjectGlobalConfigContext()
  return computed(() => {
    const {
      readonlyRender,
      readonlyEmptyRender,
      expressionContext = {},
    } = props ?? {}

    const {
      readonlyRender: globalReadonlyRender,
      readonlyEmptyRender: globalReadonlyEmptyRender,
      expressionContext: globalExpressionContext = {},
    } = unref(proForm) ?? {}

    return {
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
