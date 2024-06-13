import type { ArrayField } from 'pro-components-hooks'

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
