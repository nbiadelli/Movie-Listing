import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MovieDetails from '../DetailsView.vue' // Certifique-se de que o caminho esteja correto
import { useRoute } from 'vue-router'
import { useDetailsMovies, useCast } from '@/composables/useMovies'
import Loading from '@/components/shared/Loading.vue'

vi.mock('vue-router', () => ({
  useRoute: vi.fn()
}))

vi.mock('@/composables/useMovies', () => ({
  useDetailsMovies: vi.fn(),
  useCast: vi.fn(),
  errorMessage: 'Erro ao carregar detalhes do filme'
}))

vi.mock('@/components/shared/DetailsCard.vue', () => ({
  default: {
    name: 'DetailsCard',
    template: '<div />',
    props: ['detailsMovies']
  }
}))

vi.mock('../../components/layout/ScrollerWrap.vue', () => ({
  default: {
    name: 'ScrollerWrap',
    template: '<div />',
    props: ['title', 'list']
  }
}))

describe('MovieDetails component', () => {
  const routeMock = {
    params: { id: '1' }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useRoute.mockReturnValue(routeMock)
  })

  it('should display loading component when isLoading is true', async () => {
    useDetailsMovies.mockReturnValue({
      data: null,
      isLoading: true
    })
    useCast.mockReturnValue({
      data: null
    })

    const wrapper = mount(MovieDetails)

    expect(wrapper.findComponent(Loading).exists()).toBe(true)
  })

  it('should display movie details and cast when isLoading is false', async () => {
    useDetailsMovies.mockReturnValue({
      data: { value: { title: 'The Matrix' } },
      isLoading: false
    })
    useCast.mockReturnValue({
      data: { value: { cast: [{ name: 'Keanu Reeves' }] } }
    })

    const wrapper = mount(MovieDetails)

    const detailsCard = wrapper.findComponent({ name: 'DetailsCard' })
    expect(detailsCard.exists()).toBe(true)

    const scrollerWrap = wrapper.findComponent({ name: 'ScrollerWrap' })
    expect(scrollerWrap.exists()).toBe(true)
  })

  it('should display error message when errorMessage is available', async () => {
    useDetailsMovies.mockReturnValue({
      data: null,
      isLoading: false
    })
    useCast.mockReturnValue({
      data: null
    })

    const wrapper = mount(MovieDetails)

    // Verificar se a mensagem de erro está presente
    expect(wrapper.text()).toContain('Erro ao carregar detalhes do filme')
  })
})
