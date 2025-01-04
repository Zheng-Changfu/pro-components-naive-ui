import type { MaybeRef } from 'vue'
import { inject, provide } from 'vue'
import { createInjectionKey } from '../composables/createInjectionKey'

interface GlobalConfig {
  mergedPropOverrides: MaybeRef<Record<string, object>>
}

const globalConfigInjectionKey = createInjectionKey<GlobalConfig>('global-config')

export function provideGlobalConfig(config: GlobalConfig) {
  provide(globalConfigInjectionKey, config)
}

export function useInjectGlobalConfig() {
  return inject(globalConfigInjectionKey, {
    mergedPropOverrides: {},
  })
}
