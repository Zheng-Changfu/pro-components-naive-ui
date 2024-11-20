import type { Merge } from 'type-fest'
import type { CSSProperties } from 'vue'

export type AnyFn = (...args: any[]) => any
export type IsFunction<T> = T extends AnyFn ? true : false
export type BaseFieldProps<T> = Merge<{
  class?: string
  style?: CSSProperties
  [x: string]: any
}, T>
