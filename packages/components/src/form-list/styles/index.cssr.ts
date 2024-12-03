import { c, cB, cE } from 'naive-ui'

export default c([
  cB('pro-form-list-wrapper.n-form-item', [
    c('>', [
      cB('form-item-blank', `
        display: block;
      `),
    ]),
  ]),
  cB('pro-form-list', [
    cE('item', `
      display: flex;
      gap: 0 16px;
      flex-wrap: wrap;
      align-items: flex-end;
    `),
  ]),
])
