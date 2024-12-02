import type { InjectionKey, MaybeRef, VNodeChild } from 'vue'
import { inject, provide } from 'vue'

interface GlobalConfig {
  mergedEmpty: (wrappedIn: 'xxxxx') => VNodeChild
  mergedPropOverrides: MaybeRef<Record<string, object>>
}

const globalConfigContextKey = Symbol('globalConfig') as InjectionKey<GlobalConfig>

export function provideGlobalConfig(config: GlobalConfig) {
  provide(globalConfigContextKey, config)
}

export function useInjectGlobalConfig() {
  return inject(globalConfigContextKey, {
    mergedEmpty: () => '-',
    mergedPropOverrides: {},
  })
}
