import type { ArrayField } from 'pro-components-hooks'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../composables'

export type ProFormListInst = Pick<
  ArrayField,
  | 'insert'
  | 'move'
  | 'moveDown'
  | 'moveUp'
  | 'pop'
  | 'push'
  | 'remove'
  | 'shift'
  | 'unshift'
>

const [
  provideFormListInstStore,
  useInjectFormListInstStore,
] = createInjectionState(useComponentInst<ProFormListInst>)

export {
  provideFormListInstStore,
  useInjectFormListInstStore,
}
