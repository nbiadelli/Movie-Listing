import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ScrollerWrap from '../layout/ScrollerWrap.vue'
import Cards from '@/components/shared/Cards.vue'
import { RouterLinkStub } from '@vue/test-utils'

describe('ScrollerWrap', () => {
  const defaultProps = {
    title: 'Popular Movies',
    list: [
      {
        id: 1,
        title: 'Movie 1',
        release_date: '2023-10-10',
        poster_path: '/path/to/poster1.jpg',
        vote_average: 8.5
      },
      {
        id: 2,
        name: 'Actor 1',
        character: 'Character 1',
        profile_path: '/path/to/profile1.jpg'
      }
    ]
  }

  it('renders the title prop correctly', () => {
    const wrapper = mount(ScrollerWrap, {
      props: defaultProps
    })

    expect(wrapper.find('.card-title').text()).toBe('Popular Movies')
  })

  it('renders Cards components for each item in the list', () => {
    const wrapper = mount(ScrollerWrap, {
      props: defaultProps,
      global: {
        stubs: {
          'router-link': RouterLinkStub,
          Cards: true
        }
      }
    })

    const cards = wrapper.findAllComponents(Cards)
    expect(cards.length).toBe(2)
  })

  it('passes the correct props to the Cards component for a movie item', () => {
    const wrapper = mount(ScrollerWrap, {
      props: defaultProps,
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    })

    const card = wrapper.findComponent(Cards)
    expect(card.props('title')).toBe('Movie 1')
    expect(card.props('date')).toBe('2023-10-10')
    expect(card.props('imagem')).toBe('/path/to/poster1.jpg')
    expect(card.props('acceptance')).toBe(8.5)
  })

  it('passes the correct props to the Cards component for a cast item', () => {
    const wrapper = mount(ScrollerWrap, {
      props: defaultProps,
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    })

    const card = wrapper.findAllComponents(Cards)[1]
    expect(card.props('title')).toBe('Actor 1')
    expect(card.props('date')).toBe('Character 1')
    expect(card.props('imagem')).toBe('/path/to/profile1.jpg')
  })

  it('generates correct router-link paths for each item', () => {
    const wrapper = mount(ScrollerWrap, {
      props: defaultProps,
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    })

    const routerLinks = wrapper.findAllComponents(RouterLinkStub)
    expect(routerLinks[0].props().to).toEqual({ name: 'movie-details', params: { id: 1 } })
    expect(routerLinks[1].props().to).toEqual({ name: 'movie-details', params: { id: 2 } })
  })
})
