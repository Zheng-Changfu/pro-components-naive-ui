import type { Ref } from 'vue'
import { ref } from 'vue'
import { noop } from 'lodash-es'
import type { AnyFn } from '../types'

export function createProComponentInstanceFactory<ProComponentInst extends Record<string, AnyFn>>() {
  return function (): [Ref<ProComponentInst | undefined>, ProComponentInst] {
    const instRef = ref<ProComponentInst>()
    const methods = new Proxy(instRef as any, {
      get(_, key, receiver) {
        const inst = instRef.value
        if (!inst) {
          return noop
        }
        return Reflect.get(inst, key, receiver)
      },
    })

    return [instRef, methods as ProComponentInst]
  }
}
