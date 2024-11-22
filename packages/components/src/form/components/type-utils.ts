import type { Simplify, TupleToUnion } from 'type-fest'
import type { ProFieldProps } from './field'
import { pick } from 'lodash-es'
import { proFieldProps } from './field'

export const ignoreKeys = [
  'path',
  'isList',
  'valueType',
  'fieldProps',
  'valueModelName',
] as const

const internalProFieldPropKeys = Array.from(new Set([
  ...ignoreKeys,
  ...Object.keys(proFieldProps),
]))

export type InternalProFieldProps = Omit<ProFieldProps, TupleToUnion<typeof ignoreKeys>>
export function pickInternalProFieldProps<T extends Record<string, any>>(value: T) {
  return pick(value, internalProFieldPropKeys) as Simplify<Pick<T, keyof InternalProFieldProps>>
}
