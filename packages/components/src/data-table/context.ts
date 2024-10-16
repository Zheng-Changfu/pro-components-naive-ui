import type { InjectionKey } from 'vue'
import type { ProDataTableInst } from './inst'
import { inject, provide } from 'vue'

const proDataTableInstInjectionKey = Symbol('proDataTableInst') as InjectionKey<ProDataTableInst>

export function provideProDataTableInst(methods: ProDataTableInst) {
  return provide(proDataTableInstInjectionKey, methods)
}

export function useInjectProDataTableInst() {
  return inject(proDataTableInstInjectionKey)
}
