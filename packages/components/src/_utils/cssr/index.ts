/**
 * copy from https://github.com/tusen-ai/naive-ui/blob/main/src/_utils/cssr/index.ts
 */

import { CssRender } from 'css-render'
import { plugin as BemPlugin } from '@css-render/plugin-bem'

const namespace = 'n'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CssRender()
const plugin = BemPlugin({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix,
})
cssr.use(plugin)
const { c, find } = cssr
const { cB, cE, cM, cNotM } = plugin

export {
  c,
  cB,
  cE,
  cM,
  find,
  cNotM,
  prefix,
  namespace,
}
