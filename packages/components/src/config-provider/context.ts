import type { InjectionKey } from 'vue'
import type { ProConfigProviderExtendProps } from './props'
import { inject, provide, ref } from 'vue'

const globalConfigContextKey = Symbol('globalConfig') as InjectionKey<ProConfigProviderExtendProps>

export function provideGlobalConfig(config: ProConfigProviderExtendProps) {
  provide(globalConfigContextKey, config)
}

export function useInjectGlobalConfig() {
  return inject(globalConfigContextKey, () => {
    return {
      valueTypeMap: ref({}),
      propOverrides: ref({}),
    }
  }) as any as Required<ProConfigProviderExtendProps>
}
