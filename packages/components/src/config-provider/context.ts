import type { InjectionKey, ToRefs } from 'vue'
import { inject, provide } from 'vue'
import type { ProConfigProviderExtendProps } from './props'

const globalConfigContextKey = Symbol('globalConfig') as InjectionKey<ToRefs<ProConfigProviderExtendProps>>

export function provideGlobalConfigContext(config: ToRefs<ProConfigProviderExtendProps>) {
  provide(globalConfigContextKey, config)
}

export function useInjectGlobalConfigContext() {
  return inject(globalConfigContextKey, {})
}
