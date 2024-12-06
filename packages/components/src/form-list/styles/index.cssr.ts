import { c, cB } from 'naive-ui'
import { as } from '../../_utils/bem'

export default c([
  cB('pro-form-list-wrapper', [
    as('form-item', c('>', [
      cB('form-item-blank', `
        display: block;
      `),
    ])),
    cB('pro-form-list__item', `
      display: flex;
      gap: 0 16px;
      flex-wrap: wrap;
      align-items: start;
    `),
  ]),
])
