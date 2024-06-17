import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { ProConfigProviderExtendProps } from './props'

const globalConfigContextKey = Symbol('globalConfig') as InjectionKey<ProConfigProviderExtendProps>

export function provideGlobalConfigContext(config: ProConfigProviderExtendProps) {
  provide(globalConfigContextKey, config)
}

export function useInjectGlobalConfigContext() {
  return inject(globalConfigContextKey, {
    proForm: {},
    proDate: {},
    proTime: {},
    proTable: {},
    proButton: {},
    proUpload: {},
    proRequest: {},
    proDateYear: {},
    proDateMonth: {},
    proDateRange: {},
    proDateQuarter: {},
    proDateYearRange: {},
    proDateMonthRange: {},
    proDateQuarterRange: {},
  }) as any as Required<ProConfigProviderExtendProps>
}
