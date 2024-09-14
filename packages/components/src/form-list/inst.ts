import type { ArrayField } from 'pro-components-hooks'
import { createProComponentInstanceFactory } from '../composables'

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
export const useProFormListInst = createProComponentInstanceFactory<ProFormListInst>('ProFormList')
