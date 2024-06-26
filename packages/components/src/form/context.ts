import type { InjectionKey, MaybeRef } from 'vue'
import { inject, provide } from 'vue'
import type { ProFormInstance } from './inst'

export const proFormInstanceContextKey = Symbol('proFormInstance') as InjectionKey<ProFormInstance>
export const proFormReadonlyContextKey = Symbol('proFormReadonly') as InjectionKey<MaybeRef<boolean | undefined>>

export function provideProFormInstanceContext(inst: ProFormInstance) {
  provide(proFormInstanceContextKey, inst)
}

export function useInjectProFormInstanceContext() {
  return inject(proFormInstanceContextKey)!
}
