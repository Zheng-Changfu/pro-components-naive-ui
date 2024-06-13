import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { ProFormListInstance } from './inst'

export const proFormListInstanceContextKey = Symbol('proFormListInstance') as InjectionKey<ProFormListInstance>

export function provideProFormListInstanceContext(inst: ProFormListInstance) {
  provide(proFormListInstanceContextKey, inst)
}

export function useInjectProFormListInstanceContext() {
  return inject(proFormListInstanceContextKey)!
}

export const AUTO_CREATE_ID = 'AUTO_CREATE_ID'
