import { c, cB, cE, cM } from 'naive-ui'
import { as } from '../../_utils/bem'

export default c([
  cB('pro-edit-data-table-wrapper', [
    cB('pro-edit-data-table', `
      width: 100%;
    `, [
      cE('creator-button', `
        margin-block-start: 16px;  
      `),
    ]),
    cM(`flex-height`, `
      flex-grow: 1;
    `, [
      // label-placement 为 top
      as('form-item--top-labelled', cB('form-item-blank', `
        align-items: normal;
      `)),
      // label-placement 为 left
      as('form-item--left-labelled', cB('form-item-blank', `
        align-items: normal;
        grid-row: 1 / 3;
        height: 100%;
      `)),
      as('form-item--left-labelled', cB('form-item-feedback-wrapper', `
        grid-row: 3;
      `)),
    ]),
  ]),
])
