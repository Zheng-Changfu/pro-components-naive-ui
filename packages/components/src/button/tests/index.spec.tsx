import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ProConfigProvider } from '../../config-provider'
import { ProButton } from '../index'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

describe('pro-button', () => {
  it('should work', () => {
    mount(ProButton)
  })

  it('should work with `autoLoading` prop', async () => {
    const asyncClick = vi.fn(async () => {
      await delay(150)
    })
    const wrapper = mount(ProButton, {
      props: {
        onClick: asyncClick,
      },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button .n-icon-slot').classes()).toContain('n-base-loading')
    await delay(150)
    await wrapper.setProps({ autoLoading: false })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button .n-icon-slot').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `tooltip` prop', async () => {
    const wrapper = mount(ProButton, {
      props: {
        tooltip: 'tooltip',
      },
      slots: {
        default: () => 'button',
      },
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
      },
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

  it('should work with `auth` prop', async () => {
    const wrapper = mount(ProConfigProvider, {
      props: {
        proButton: {
          authData: { c: true },
          hasAuth: (auth: string, authData: any) => {
            return authData && authData[auth]
          },
        },
      },
      slots: {
        default: () => {
          return <ProButton auth="c"></ProButton>
        },
      },
    })
    expect(wrapper.findComponent('.n-button').exists()).toBe(true)
    await wrapper.setProps({ proButton: { authData: { c: false } } })
    expect(wrapper.findComponent('.n-button').exists()).toBe(false)
    wrapper.unmount()
  })
})
