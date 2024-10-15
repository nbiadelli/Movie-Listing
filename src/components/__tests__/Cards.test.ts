import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Cards from '../shared/Cards.vue'
import Progress from '../shared/Progress.vue'

vi.mock('../../utils/helpers', () => ({
  baseURL: 'http://example.com/'
}))

describe('Cards', () => {
  it('renders skeleton when image is not loaded', () => {
    const wrapper = mount(Cards, {
      props: {
        imagem: 'test-image.jpg',
        title: 'Test Title',
        date: '2023-10-15'
      }
    })

    expect(wrapper.find('.skeleton').exists()).toBe(true)
  })

  it('hides skeleton after image is loaded', async () => {
    const wrapper = mount(Cards, {
      props: {
        imagem: 'test-image.jpg',
        title: 'Test Title',
        date: '2023-10-15'
      }
    })

    const img = wrapper.find('img')
    await img.trigger('load')

    expect(wrapper.find('.skeleton').exists()).toBe(false)
  })

  it('uses provided imagem prop as image source', () => {
    const wrapper = mount(Cards, {
      props: {
        imagem: 'test-image.jpg',
        title: 'Test Title',
        date: '2023-10-15'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('http://example.com/test-image.jpg')
  })

  it('renders Progress component when acceptance prop is provided', () => {
    const wrapper = mount(Cards, {
      props: {
        imagem: 'test-image.jpg',
        acceptance: 50
      },
      global: {
        stubs: {
          Progress: true
        }
      }
    })

    expect(wrapper.findComponent(Progress).exists()).toBe(true)
  })

  it('does not render Progress component when acceptance prop is not provided', () => {
    const wrapper = mount(Cards, {
      props: {
        imagem: 'test-image.jpg'
      }
    })

    expect(wrapper.findComponent(Progress).exists()).toBe(false)
  })

  it('displays title and date props correctly', () => {
    const wrapper = mount(Cards, {
      props: {
        title: 'Test Title',
        date: '2023-10-15'
      }
    })

    expect(wrapper.find('h2').text()).toBe('Test Title')
    expect(wrapper.find('p').text()).toBe('2023-10-15')
  })

  it('sets alt attribute of image to title prop', () => {
    const wrapper = mount(Cards, {
      props: {
        title: 'Test Title',
        imagem: 'test-image.jpg'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('Test Title')
  })

  it('sets title attribute of outer div to title prop', () => {
    const wrapper = mount(Cards, {
      props: {
        title: 'Test Title'
      }
    })

    const outerDiv = wrapper.find('.card')
    expect(outerDiv.attributes('title')).toBe('Test Title')
  })

  it('sets loading attribute of image to lazy', () => {
    const wrapper = mount(Cards, {
      props: {
        imagem: 'test-image.jpg'
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('lazy')
  })
})
