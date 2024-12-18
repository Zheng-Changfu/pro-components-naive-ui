import { readFileSync } from 'node:fs'
import path from 'node:path'
import * as naive from 'naive-ui'
import { describe, expect, it } from 'vitest'
import * as Vue from 'vue'

// eslint-disable-next-line node/no-exports-assign
exports = undefined // 防止在全局上的定义不生效

describe('umd', () => {
  it('works', async () => {
    // @ts-ignore
    window.Vue = Vue
    // @ts-ignore
    window.naive = naive

    const scriptContent = readFileSync(path.resolve(__dirname, '../dist/index.js')).toString()
    // eslint-disable-next-line no-eval
    eval(scriptContent)

    const div = document.createElement('div')
    document.body.appendChild(div)
    // @ts-ignore
    Vue.createApp(window.proNaive.ProCard).mount(div)
    expect(div.innerHTML).toContain('n-pro-card')
  })
})
