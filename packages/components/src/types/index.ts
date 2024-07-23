import type { CSSProperties } from 'vue'

export type AnyFn = (...args: any[]) => any
export type IsFunction<T> = T extends AnyFn ? true : false
export type PickFunction<T extends Record<string, any>> = {
  [K in keyof T as IsFunction<T[K]> extends true ? K : never]: T[K]
}
export type ExtendPublicProps<T> = T & {
  class?: string
  style?: CSSProperties
  [x: string]: any
}
