import { cB } from 'naive-ui'
import { fadeInHeightExpandTransition } from '../../../../_styles/transitions/fade-in-height-expand.cssr'

export default cB('pro-collapse-transition', {
  width: '100%',
}, [
  fadeInHeightExpandTransition(),
])
