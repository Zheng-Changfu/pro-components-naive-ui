import type { Ref } from 'vue'
import { onScopeDispose, ref } from 'vue'
import type { AnyFn } from '../types'

type ProComponentName = `Pro${string}`
export function createProComponentInstanceFactory<ProComponentInst extends Record<string, AnyFn>>(name: ProComponentName) {
  return function (): [Ref<ProComponentInst | undefined>, ProComponentInst] {
    const noop = () => undefined
    const instRef = ref<ProComponentInst>()
    const cachedKeyToFuncProxyMap = new Map<string | symbol, ProxyConstructor>()

    const methods = new Proxy(instRef as any, {
      get(_, key) {
        if (cachedKeyToFuncProxyMap.has(key)) {
          return cachedKeyToFuncProxyMap.get(key)
        }
        const funcProxy = createFuncProxy(noop, key)
        cachedKeyToFuncProxyMap.set(key, funcProxy)
        return funcProxy
      },
    })

    function createFuncProxy<T extends AnyFn>(fn: T, key: any): any {
      return new Proxy(fn, {
        apply(_, thisArg, argArray) {
          const inst = instRef.value
          if (!inst) {
            console.warn(`${name}: instance does not exits!`)
            return createFuncProxy(noop, key)
          }
          return Reflect.apply(inst[key], thisArg, argArray)
        },
      })
    }

    onScopeDispose(() => {
      cachedKeyToFuncProxyMap.clear()
    })

    return [instRef, methods as ProComponentInst]
  }
}
