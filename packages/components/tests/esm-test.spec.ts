import naive from 'naive-ui'
import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
// eslint-disable-next-line antfu/no-import-dist
import { ProCard } from '../dist/index.mjs'

describe('esm', () => {
  it('works', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    // @ts-ignore
    const app = createApp(ProCard)
    app.use(naive)
    app.mount(div)
    expect(div.innerHTML).toContain('n-pro-card')
  })
})
