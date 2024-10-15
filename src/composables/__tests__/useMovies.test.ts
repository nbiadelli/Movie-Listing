// movies.test.ts
import { describe, it, expect, vi } from 'vitest'
import { useQuery } from '@tanstack/vue-query'
import {
  usePopularMovies,
  useTrendingMovies,
  useDetailsMovies,
  useCast,
  shouldRetry,
  handleError,
  errorMessage
} from '../useMovies'
import { getPopularMovies, getTrendingMovies, getdetailsMovies, getCast } from '../../server/movies'

vi.mock('@tanstack/vue-query', () => {
  return {
    useQuery: vi.fn()
  }
})

vi.mock('../server/movies', () => ({
  getPopularMovies: vi.fn(),
  getTrendingMovies: vi.fn(),
  getdetailsMovies: vi.fn(),
  getCast: vi.fn()
}))

describe('movies', () => {
  it('should retry if failureCount < 2 and status is >= 500', () => {
    expect(shouldRetry(1, 500)).toBe(true)
    expect(shouldRetry(2, 500)).toBe(false)
  })

  it('should not retry for 4xx errors (except 429)', () => {
    expect(shouldRetry(1, 404)).toBe(false)
    expect(shouldRetry(1, 429)).toBe(true)
  })

  it('handles error correctly for 404', () => {
    handleError(404)
    expect(errorMessage.value).toBe('Página não encontrada. 😢')
  })
})
