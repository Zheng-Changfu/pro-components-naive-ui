import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ProButton } from '../index'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

describe('pro-button', () => {
  it('should work', () => {
    mount(ProButton)
  })

  it('should work with `tooltip` prop', async () => {
    const wrapper = mount(ProButton, {
      props: {
        tooltip: 'tooltip',
      },
      slots: {
        default: () => 'button',
      } as any,
    })
    await wrapper.find('.n-button').trigger('mouseenter')
    await delay(100)
    expect(document.querySelector('.n-popover')).not.toEqual(null)
    await wrapper.find('.n-button').trigger('mouseleave')
    await delay(100)
    expect(document.querySelector('.n-popover')).toEqual(null)
    await wrapper.setProps({ disabled: true })
    await wrapper.find('.n-button').trigger('mouseenter')
    await delay(100)
    expect(document.querySelector('.n-popover')).toEqual(null)
    wrapper.unmount()
  })

  it('should work with `disabledTooltip` prop', async () => {
    const wrapper = mount(ProButton, {
      props: {
        tag: 'a',
        disabledTooltip: 'tooltip',
      },
      slots: {
        default: () => 'button',
      } as any,
    })
    await wrapper.find('.n-button').trigger('mouseenter')
    await delay(100)
    expect(document.querySelector('.n-popover')).toEqual(null)
    await wrapper.find('.n-button').trigger('mouseleave')
    await wrapper.setProps({ disabled: true })
    await wrapper.find('.n-button').trigger('mouseenter')
    await delay(100)
    expect(document.querySelector('.n-popover')).not.toEqual(null)
    wrapper.unmount()
  })
})
