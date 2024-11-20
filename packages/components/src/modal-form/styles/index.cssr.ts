import { c, cB, cE } from 'naive-ui'

export default c([
  cB('card', [
    cE('content', `
      overflow: auto; 
    `),
  ]),
  cB('modal-scroll-content', `
     height: 100%;
  `),
])
