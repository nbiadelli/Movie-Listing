import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Home from '../HomeView.vue'
import { usePopularMovies, useTrendingMovies } from '@/composables/useMovies'
import { useRouter, useRoute } from 'vue-router'

vi.mock('@/composables/useMovies')
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn()
  }))
}))

describe('Home', () => {
  const pushMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useRouter.mockReturnValue({ push: pushMock })
    useRoute.mockReturnValue({ query: { search: '' } })
  })

  it('should render popular and trending movies when data is available', async () => {
    usePopularMovies.mockReturnValue({
      data: { value: { results: [{ id: 1, title: 'Popular Movie' }] } },
      isLoading: false
    })
    useTrendingMovies.mockReturnValue({
      data: { value: { results: [{ id: 2, title: 'Trending Movie' }] } },
      isLoading: false
    })

    const wrapper = mount(Home)

    expect(wrapper.findComponent({ name: 'ScrollerWrap' }).exists()).toBe(true)
    expect(wrapper.text()).toContain('Populares')
    expect(wrapper.text()).toContain('Tendência')
  })

  it('should display loading component when data is loading', async () => {
    // Mockar loading
    usePopularMovies.mockReturnValue({
      data: { value: null },
      isLoading: true
    })
    useTrendingMovies.mockReturnValue({
      data: { value: null },
      isLoading: true
    })

    const wrapper = mount(Home)

    expect(wrapper.findComponent({ name: 'Loading' }).exists()).toBe(true)
  })

  it('should redirect to search result when enter is pressed', async () => {
    const wrapper = mount(Home)

    const input = wrapper.find('input[type="text"]')
    await input.setValue('Batman')
    await input.trigger('keyup.enter')

    expect(pushMock).toHaveBeenCalledWith('/movie/search-result/Batman')
  })
})
