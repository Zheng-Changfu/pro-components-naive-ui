import type { ProEditDataTableInst } from './inst'
import { inject, provide } from 'vue'
import { createInjectionKey } from '../composables/createInjectionKey'

export const proEditDataTableInstInjectionKey = createInjectionKey<ProEditDataTableInst>('pro-edit-data-table')

export function provideProEditDataTableInst(inst: ProEditDataTableInst) {
  provide(proEditDataTableInstInjectionKey, inst)
}

export function useInjectProEditDataTableInst() {
  return inject(proEditDataTableInstInjectionKey)
}
