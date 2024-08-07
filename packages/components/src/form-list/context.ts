import type { ComputedRef, InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { ProFormListInst } from './inst'

export const proFormListInstContextKey = Symbol('proFormListInst') as InjectionKey<ProFormListInst>
export const proFormListContextKey = Symbol('proFormListContext') as InjectionKey<{
  showLabel: ComputedRef<boolean | undefined>
}>

export function provideProFormListInst(inst: ProFormListInst) {
  provide(proFormListInstContextKey, inst)
}

export function useInjectProFormListInst() {
  return inject(proFormListInstContextKey)!
}

export const AUTO_CREATE_ID = 'AUTO_CREATE_ID'
