import { c, cB, cE, cM } from 'naive-ui'

export default cB('pro-card', [
  cB('card__content', `
    transition: 
    border-color 0.3s var(--n-bezier),
    padding 0.1s var(--n-bezier) 0.1s !important;
  `, [
    cM('hidden', `
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    `),
  ]),
  cB('card-header', [
    cE('main', [
      c('>', [
        cM('trigger', `
          cursor: pointer;
        `),
      ]),
      cB('icon', [
        cM('tooltip', `
          cursor: pointer;
          margin-inline-start: 4px;
          vertical-align: middle;
          display: inline !important;
        `),
      ]),
    ]),
    cE('extra', `
       margin-left: 8px;  
    `, [
      c('>', [
        cM('trigger', `
          cursor: pointer;
      `),
      ]),
    ]),
  ]),
])
