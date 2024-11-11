import type { ShallowRef } from 'vue'
import { onScopeDispose } from 'vue'

type Inst = any
type SetComponentInst<Inst> = (methods: Inst) => void

interface UseComponentInstReturn<Inst> {
  exposed: Partial<Inst>
  registerInst: SetComponentInst<Inst>
  instRef: ShallowRef<Inst | undefined>
}

export function useComponentInst<T = Inst>(): UseComponentInstReturn<T> {
  const exposed = {}
  let registed = false
  const instRef = shallowRef<T>()

  function registerInst(methods: T) {
    if (!registed) {
      Object.assign(exposed, methods)
      registed = true
    }
  }

  onScopeDispose(() => {
    registed = false
  })

  return {
    instRef,
    exposed,
    registerInst,
  }
}
