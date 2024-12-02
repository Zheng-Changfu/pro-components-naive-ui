import type { InjectionKey } from 'vue'

/**
 * copy from naive
 */
export function createInjectionKey<T>(key: string): InjectionKey<T> {
  return key as any
}
