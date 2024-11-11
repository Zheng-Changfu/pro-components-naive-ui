import { c, cB, cE, cM } from 'naive-ui'

// --n-prefix-height
// --n-prefix-bg-color
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
        cM('prefix', `
          position: relative;
          padding-left: 12px;
        `, [
          c('&::before', `
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            margin: auto 0;
            content: ''; 
            width: 4px;
            border-radius: 2px;
            height: var(--n-prefix-height);
            background: var(--n-prefix-bg-color);
          `),
        ]),
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
