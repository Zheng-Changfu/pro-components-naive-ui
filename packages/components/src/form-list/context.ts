import type { MaybeRef } from 'vue'
import type { ProFormListInst } from './inst'
import { inject, provide } from 'vue'
import { createInjectionKey } from '../composables/createInjectionKey'

export const proFormListConfigInjectionKey = createInjectionKey<{
  showLabel: MaybeRef<boolean | undefined>
}>('pro-form-list-config')

export const proFormListInstInjectionKey = createInjectionKey<ProFormListInst>('pro-form-list')

export function provideProFormListInst(inst: ProFormListInst) {
  provide(proFormListInstInjectionKey, inst)
}

export function useInjectProFormListInst() {
  return inject(proFormListInstInjectionKey)!
}
