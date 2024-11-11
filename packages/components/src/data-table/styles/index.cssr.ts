import { cB, cM } from 'naive-ui'

export default cB('pro-data-table', [
  cM('flex-height', `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `, [
    cB('pro-card', `
      flex-grow: 1;
    `),
    cB('pro-card-content', `
      display: flex;
      flex-direction: column;
  `, [
      cB('pro-collapse-transition', `
      display: flex;
      flex-direction: column;
      flex-grow: 1;
   `, [
        cB('data-table', `
        flex-grow:1;  
      `),
      ]),
    ]),
  ]),
])
