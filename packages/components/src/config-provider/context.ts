import type { InjectionKey, MaybeRef, VNodeChild } from 'vue'
import { inject, provide } from 'vue'

export type WrappedIn = 'form' | 'data-table' | 'edit-data-table' | ''

interface GlobalConfig {
  mergedEmpty: (wrappedIn: WrappedIn) => VNodeChild
  mergedPropOverrides: MaybeRef<Record<string, object>>
}

const wrappedInContextKey = Symbol('wrappedIn') as InjectionKey<WrappedIn>
const globalConfigContextKey = Symbol('globalConfig') as InjectionKey<GlobalConfig>

export function provideGlobalConfig(config: GlobalConfig) {
  provide(globalConfigContextKey, config)
}

export function provideWrappedIn(wrappedIn: WrappedIn) {
  return provide(wrappedInContextKey, wrappedIn)
}

export function useInjectWrappedIn() {
  return inject(wrappedInContextKey, '')
}

export function useInjectGlobalConfig() {
  return inject(globalConfigContextKey, {
    mergedEmpty: () => '-',
    mergedPropOverrides: {},
  })
}
