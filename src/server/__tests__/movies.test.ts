import { describe, it, expect, vi, afterEach } from 'vitest'
import apiClient from '../client'
import {
  getPopularMovies,
  getTrendingMovies,
  getdetailsMovies,
  getCast,
  getSearch
} from '../movies'
import { handleError } from '../../composables/useMovies'

vi.mock('../client', () => ({
  default: {
    get: vi.fn()
  }
}))

vi.mock('../../composables/useMovies', () => ({
  handleError: vi.fn()
}))

describe('getPopularMovies', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('must search for movies in Popular successfully', async () => {
    const mockData = { results: [{ id: 1, title: 'Filme em Tendência' }] }
    ;(apiClient.get as Mock).mockResolvedValue({ data: mockData })

    const result = await getPopularMovies(1)

    // Verifica se a função foi chamada com a URL correta
    expect(apiClient.get).toHaveBeenCalledWith(
      '/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc'
    )

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockData)

    // Verifica se o handleError não foi chamado
    expect(handleError).not.toHaveBeenCalled()
  })

  it('should call handleError when error occurs in getPopularMovies', async () => {
    const mockError = { response: { status: 500 } }
    ;(apiClient.get as Mock).mockRejectedValue(mockError)

    // Verifica se a função lança um erro
    await expect(getPopularMovies(1)).rejects.toThrowError()

    // Verifica se o handleError foi chamado com o código de status correto
    expect(handleError).toHaveBeenCalledWith(500)
  })
})

describe('getTrendingMovies', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should look for trending movies successfully', async () => {
    const mockData = { results: [{ id: 1, title: 'Filme em Tendência' }] }
    ;(apiClient.get as Mock).mockResolvedValue({ data: mockData })

    const result = await getTrendingMovies(1)

    // Verifica se a função foi chamada com a URL correta
    expect(apiClient.get).toHaveBeenCalledWith('/trending/movie/day?language=pt-BR&page=1')

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockData)

    // Verifica se o handleError não foi chamado
    expect(handleError).not.toHaveBeenCalled()
  })

  it('should call handleError when error occurs in getTrendingMovies', async () => {
    const mockError = { response: { status: 500 } }
    ;(apiClient.get as Mock).mockRejectedValue(mockError)

    // Verifica se a função lança um erro
    await expect(getTrendingMovies(1)).rejects.toThrowError()

    // Verifica se o handleError foi chamado com o código de status correto
    expect(handleError).toHaveBeenCalledWith(500)
  })
})

describe('getdetailsMovies', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('must successfully fetch movie details', async () => {
    const mockData = { id: 1, title: 'Detalhes do Filme' }
    ;(apiClient.get as Mock).mockResolvedValue({ data: mockData })

    const result = await getdetailsMovies('1')

    // Verifica se a função foi chamada com a URL correta
    expect(apiClient.get).toHaveBeenCalledWith('/movie/1?language=pt-BR')

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockData)

    // Verifica se o handleError não foi chamado
    expect(handleError).not.toHaveBeenCalled()
  })

  it('should call handleError when error occurs in getdetailsMovies', async () => {
    const mockError = { response: { status: 404 } }
    ;(apiClient.get as Mock).mockRejectedValue(mockError)

    // Verifica se a função lança um erro
    await expect(getdetailsMovies('1')).rejects.toThrowError()

    // Verifica se o handleError foi chamado com o código de status correto
    expect(handleError).toHaveBeenCalledWith(404)
  })
})

describe('getCast', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('must successfully seek cast details', async () => {
    const mockData = { cast: [{ id: 1, name: 'Ator 1' }] }
    ;(apiClient.get as Mock).mockResolvedValue({ data: mockData })

    const result = await getCast('1')

    // Verifica se a função foi chamada com a URL correta
    expect(apiClient.get).toHaveBeenCalledWith('/movie/1/credits')

    // Verifica se o resultado retornado é o esperado
    expect(result).toEqual(mockData)

    // Verifica se o handleError não foi chamado
    expect(handleError).not.toHaveBeenCalled()
  })

  it('should call handleError when error occurs in getCast', async () => {
    const mockError = { response: { status: 404 } }
    ;(apiClient.get as Mock).mockRejectedValue(mockError)

    // Verifica se a função lança um erro
    await expect(getCast('1')).rejects.toThrowError()

    // Verifica se o handleError foi chamado com o código de status correto
    expect(handleError).toHaveBeenCalledWith(404)
  })
})

describe('getSearch', () => {
  const consoleLogSpy = vi.spyOn(console, 'log')

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('must perform movie search successfully', async () => {
    const mockData = { results: [{ id: 1, title: 'Filme 1' }] }
    ;(apiClient.get as Mock).mockResolvedValue({ data: mockData })

    const result = await getSearch('test', 1)

    expect(apiClient.get).toHaveBeenCalledWith(
      'search/movie?query=test&include_adult=false&language=pt-BR&page=1'
    )

    expect(consoleLogSpy).toHaveBeenCalledWith('getSearch', 1)

    expect(result).toEqual(mockData)

    expect(handleError).not.toHaveBeenCalled()
  })

  it('should call handleError when error occurs in getSearch', async () => {
    const mockError = { response: { status: 404 } }
    ;(apiClient.get as Mock).mockRejectedValue(mockError)

    await expect(getSearch('test', 1)).rejects.toThrowError()

    expect(consoleLogSpy).toHaveBeenCalledWith('getSearch', 1)

    expect(handleError).toHaveBeenCalledWith(404)
  })
})
