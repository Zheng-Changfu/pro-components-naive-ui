import type { ArrayField } from 'pro-components-hooks'
import { createProComponentInstanceFactory } from '../hooks'

export type ProFormListInstance = Pick<
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
export const useProFormListInstance = createProComponentInstanceFactory<ProFormListInstance>('ProFormList')
