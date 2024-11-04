import type { ShallowRef } from 'vue'
import { onScopeDispose } from 'vue'

type Inst = any
type SetComponentInst<Inst> = (methods: Inst) => void
type UseComponentInstReturn<Inst> = [
  Partial<Inst>,
  ShallowRef<Inst>,
  SetComponentInst<Inst>,
]
export function useComponentInst<T = Inst>() {
  const exposed = {}
  let registed = false
  const instRef = shallowRef<T>()

  function registerComponentInst(methods: T) {
    if (!registed) {
      Object.assign(exposed, methods)
      registed = true
    }
  }

  onScopeDispose(() => {
    registed = false
  })

  return [
    exposed,
    instRef,
    registerComponentInst,
  ] as UseComponentInstReturn<T>
}
