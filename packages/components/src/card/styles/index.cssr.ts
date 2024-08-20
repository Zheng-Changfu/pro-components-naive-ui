import { c, cB } from 'naive-ui'

// --n-prefix-height
// --n-prefix-bg-color
export default cB('pro-card', [
  c('&-content', `
    transition: 
      border-color 0.3s var(--n-bezier),
      padding 0.1s var(--n-bezier) 0.1s !important;
  `, [
    c('&__hidden', `
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    `),
  ]),
  c('&-header__main', [
    c('&__tooltip', `
        cursor: pointer;
        margin-inline-start: 4px;
        vertical-align: middle;
        display: inline !important;
    `),
    c('&.triggerable', `
      cursor: pointer;
    `),
    c('&.prefix', `
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
  c('&-header__extra', `
    margin-left: 8px;  
  `, [
    c('&.triggerable', `
        cursor: pointer;
    `),
  ]),
])
