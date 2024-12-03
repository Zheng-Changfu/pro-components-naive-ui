import type { ProListFieldSharedProps } from '../props'
import { keep } from '../../../../_utils/keep'
import { keysOf } from '../../../../_utils/keysOf'
import { proListFieldSharedProps } from '../props'

export function pickProListFieldSharedProps<T extends Record<string, any>>(value: T) {
  return keep(value, keysOf(proListFieldSharedProps)) as ProListFieldSharedProps
}
