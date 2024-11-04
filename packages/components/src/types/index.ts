import type { CSSProperties } from 'vue'

export type AnyFn = (...args: any[]) => any
export type IsFunction<T> = T extends AnyFn ? true : false
export type ExtendAttrsStyleProps<T> = T & {
  class?: string
  style?: CSSProperties
  [x: string]: any
}
