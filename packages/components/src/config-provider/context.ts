import type { MaybeRef, VNodeChild } from 'vue'
import { inject, provide } from 'vue'
import { createInjectionKey } from '../composables/createInjectionKey'

export type WrappedIn = 'form' | 'data-table' | ''

interface GlobalConfig {
  mergedEmpty: (wrappedIn: WrappedIn) => VNodeChild
  mergedPropOverrides: MaybeRef<Record<string, object>>
}

const wrappedInInjectionKey = createInjectionKey<WrappedIn>('wrapped-in')
const globalConfigInjectionKey = createInjectionKey<GlobalConfig>('global-config')

export function provideGlobalConfig(config: GlobalConfig) {
  provide(globalConfigInjectionKey, config)
}

export function provideWrappedIn(wrappedIn: WrappedIn) {
  return provide(wrappedInInjectionKey, wrappedIn)
}

export function useInjectWrappedIn() {
  return inject(wrappedInInjectionKey, '')
}

export function useInjectGlobalConfig() {
  return inject(globalConfigInjectionKey, {
    mergedEmpty: () => '-',
    mergedPropOverrides: {},
  })
}
