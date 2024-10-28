import type { InjectionKey } from 'vue'
import type { ProDataTableInst } from './inst'
import type { ProDataTableProps } from './props'
import { inject, provide } from 'vue'

const proDataTableInstInjectionKey = Symbol('proDataTableInst') as InjectionKey<ProDataTableInst>

export function provideProDataTableInst(methods: ProDataTableInst) {
  return provide(proDataTableInstInjectionKey, methods)
}

export function useInjectProDataTableInst() {
  return inject(proDataTableInstInjectionKey)
}

const proDataTablePropsInjectionKey = Symbol('proDataTableProps') as InjectionKey<ComputedRef<ProDataTableProps>>
export function provideProDataTableProps(props: ComputedRef<ProDataTableProps>) {
  return provide(proDataTablePropsInjectionKey, props)
}

export function useInjectProDataTableProps() {
  return inject(proDataTablePropsInjectionKey)
}
