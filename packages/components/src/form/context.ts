import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { useMergeProFormGlobalConfig } from '../config-provider'
import type { ProFormInstance } from './inst'

export const proFormInstanceContextKey = Symbol('proFormInstance') as InjectionKey<ProFormInstance>
export const proFormMergedConfigContextKey = Symbol('proFormMergedConfig') as InjectionKey<ReturnType<typeof useMergeProFormGlobalConfig>>

export function provideProFormInstanceContext(inst: ProFormInstance) {
  provide(proFormInstanceContextKey, inst)
}

export function useInjectProFormInstanceContext() {
  return inject(proFormInstanceContextKey)!
}
