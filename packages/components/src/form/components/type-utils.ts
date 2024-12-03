import type { TupleToUnion } from 'type-fest'
import type { ProFieldProps } from './field'

const ignoreKeys = [
  'path',
  'isList',
  'valueType',
  'fieldProps',
  'valueModelName',
] as const

export type InternalProFieldProps = Omit<ProFieldProps, TupleToUnion<typeof ignoreKeys>>
