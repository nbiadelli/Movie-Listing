import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import DetailsCard from '../shared/DetailsCard.vue'
import Progress from '../shared/Progress.vue'

vi.mock('../../utils/helpers', () => ({
  baseURL: 'http://example.com/'
}))

describe('DetailsCard', () => {
  const defaultProps = {
    detailsMovies: {
      title: 'Test Movie',
      backdrop_path: '/test-path.jpg',
      genres: [{ id: 1, name: 'Action' }],
      vote_average: 7.5,
      overview: 'This is a test movie.'
    }
  }

  it('displays the skeleton loader when image is not loaded', () => {
    const wrapper = mount(DetailsCard, {
      props: defaultProps
    })

    expect(wrapper.find('.skeleton').exists()).toBe(true)
  })

  it('hides the skeleton loader after image is loaded', async () => {
    const wrapper = mount(DetailsCard, {
      props: defaultProps
    })

    const img = wrapper.find('img')
    await img.trigger('load')

    expect(wrapper.find('.skeleton').exists()).toBe(false)
  })

  it('renders the movie title', () => {
    const wrapper = mount(DetailsCard, {
      props: defaultProps
    })

    expect(wrapper.find('.card-title').text()).toBe('Test Movie')
  })

  it('renders the genres correctly', () => {
    const wrapper = mount(DetailsCard, {
      props: defaultProps
    })

    const genreDivs = wrapper.findAll('.mr-6')
    expect(genreDivs.length).toBe(1)
    expect(genreDivs[0].text()).toBe('Action')
  })

  it('renders the Progress component with the correct vote_average', () => {
    const wrapper = mount(DetailsCard, {
      props: defaultProps,
      global: {
        stubs: {
          Progress: true
        }
      }
    })

    const progressComponent = wrapper.findComponent(Progress)
    expect(progressComponent.exists()).toBe(true)
    expect(progressComponent.props('acceptance')).toBe(7.5)
  })

  it('renders the overview when provided', () => {
    const wrapper = mount(DetailsCard, {
      props: defaultProps
    })

    expect(wrapper.find('.max-w-7xl').text()).toBe('This is a test movie.')
  })

  it('renders a fallback message when overview is not provided', () => {
    const propsWithoutOverview = {
      detailsMovies: {
        ...defaultProps.detailsMovies,
        overview: null
      }
    }

    const wrapper = mount(DetailsCard, {
      props: propsWithoutOverview
    })

    expect(wrapper.find('.max-w-7xl').text()).toBe('Filme sem descreção.')
  })
})
