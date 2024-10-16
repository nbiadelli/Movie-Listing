import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import SearchResultView from '../SearchResultView.vue'
import { useQuery } from '@tanstack/vue-query'

vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      search: 'Test Movie'
    }
  })
}))

vi.mock('../../components/shared/Loading.vue', () => ({
  default: {
    template: '<div>Loading...</div>'
  }
}))

describe('SearchResultView', () => {
  it('should display search results correctly', async () => {
    useQuery.mockReturnValue({
      data: {
        results: [{ id: 1, title: 'Test Movie', overview: 'Description', poster_path: '/path' }],
        total_pages: 1,
        page: 1
      },
      isLoading: false
    })

    const wrapper = mount(SearchResultView)

    expect(wrapper.text()).toContain('Test Movie')
    expect(wrapper.text()).toContain('Description')
  })

  it('should display skeleton when image is not loaded', async () => {
    useQuery.mockReturnValue({
      data: {
        results: [{ id: 1, title: 'Test Movie', overview: 'Description', poster_path: null }],
        total_pages: 1,
        page: 1
      },
      isLoading: false
    })

    const wrapper = mount(SearchResultView)

    expect(wrapper.find('.skeleton').exists()).toBe(true)
  })

  it('should display the loading component while data is being fetched', async () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true
    })

    const wrapper = mount(SearchResultView)

    expect(wrapper.text()).toContain('Loading...')
  })

  it('must disable the "Previous" button on the first page', async () => {
    useQuery.mockReturnValue({
      data: {
        results: [{ id: 1, title: 'Test Movie', overview: 'Description', poster_path: '/path' }],
        total_pages: 2,
        page: 1
      },
      isLoading: false
    })

    const wrapper = mount(SearchResultView)
    const prevButton = wrapper.find('button:disabled')

    expect(prevButton.text()).toContain('Anterior')
  })
})
