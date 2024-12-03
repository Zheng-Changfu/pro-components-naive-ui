import type { CNode } from 'css-render'
import { c } from 'naive-ui'

const namespace = 'n'
const prefix = `.${namespace}-`

export function as(name: string, style: CNode): CNode {
  return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}${name}`, [style])
}
