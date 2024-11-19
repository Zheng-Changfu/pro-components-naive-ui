import { c, cB } from 'naive-ui'
import { DRAGGABLE_CLASS } from '../composables/useDragModal'

export default cB('pro-modal', [
  c(`.${DRAGGABLE_CLASS}`, `
      cursor: move;
  `),
])
