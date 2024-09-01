import { c, cB } from 'naive-ui'
import { draggableClass } from '../const'

export default cB('pro-modal', [
  c(`.${draggableClass}`, `
      cursor: move;
  `),
])
