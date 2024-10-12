import { useQuery } from '@tanstack/vue-query'
import { getPopularMovies, getTrendingMovies } from '../server/movies'
import type { MoviesResponse } from '../server/movie.types'

// Função de retentativa configurável.
const shouldRetry = (failureCount: number, error: any): boolean => {
  const status = error
  if (status >= 400 && status < 500 && status !== 429) return false
  return failureCount < 2
}

const handleError = (error: any): boolean => {
  const status = error
  const hasErrors = status !== '200'
  switch (status) {
    case 401:
      console.error('Erro 401: Chave da API inválida ou ausente.')
      break
    case 404:
      console.error('Erro 404: Recurso não encontrado.')
      break
    case 429:
      console.error('Erro 429: Limite de requisições excedido. Tente novamente mais tarde.')
      break
    default:
      if (status >= 500) {
        console.error('Erro no servidor. Tente novamente mais tarde.')
      } else {
        console.error('Ocorreu um erro inesperado.')
      }
      break
  }

  return hasErrors
}

export const usePopularMovies = (page: number) => {
  const { data, isLoading, error } = useQuery<MoviesResponse>({
    queryKey: ['popularMovies', page],
    queryFn: () => getPopularMovies(page),
    retry: shouldRetry,
    throwOnError: handleError
  })

  return { data, isLoading, error }
}

export const useTrendingMovies = (page: number) => {
  const { data, isLoading, error } = useQuery<MoviesResponse, any>({
    queryKey: ['popularMovies', page],
    queryFn: () => getTrendingMovies(page),
    retry: shouldRetry,
    throwOnError: handleError
  })

  return { data, isLoading, error }
}
