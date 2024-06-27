import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { ProButton } from '../index'

describe('ssr', () => {
  it('should work', async () => {
    const app = createSSRApp(() => <ProButton />)
    try {
      await renderToString(app)
    }
    catch (error) {
      expect(error).not.toBeTruthy()
    }
  })
})
