import type { ProEditDataTableInst } from './inst'

export const proEditDataTableInstContextKey = Symbol('proEditDataTableInst') as InjectionKey<ProEditDataTableInst>

export function provideProEditDataTableInst(inst: ProEditDataTableInst) {
  provide(proEditDataTableInstContextKey, inst)
}

export function useInjectProEditDataTableInst() {
  return inject(proEditDataTableInstContextKey)
}
