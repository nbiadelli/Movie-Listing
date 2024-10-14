import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { getPopularMovies, getTrendingMovies, getdetailsMovies, getCast } from '../server/movies'
import type { MoviesResponse, CastResponse } from '../server/movie.types'

export const shouldRetry = (failureCount: number, error: any): boolean => {
  const status = error
  if (status >= 400 && status < 500 && status !== 429) return false
  return failureCount < 2
}

export const errorMessage = ref('')

export const showErrorToast = (message: string) => {
  errorMessage.value = message
}

export const handleError = (error: any): boolean => {
  const status = error
  const hasErrors = status !== '200'
  let message = ''
  switch (status) {
    case 401:
      console.error('Erro 401: Chave da API inválida ou ausente.')
      break
    case 404:
      console.error('Erro 404: Recurso não encontrado.')
      message = 'Página não encontrada. 😢'
      showErrorToast(message)
      break
    case 429:
      console.error('Erro 429: Limite de requisições excedido. Tente novamente mais tarde.')
      break
    default:
      if (status >= 500) {
        console.error('Erro no servidor. Tente novamente mais tarde.')
        message = 'Erro no servidor. Tente novamente mais tarde. ⚠️'
        showErrorToast(message)
      } else {
        console.error('Ocorreu um erro inesperado. 🤯')
      }
      break
  }
  return hasErrors
}

export const usePopularMovies = (page: number) => {
  const { data, isLoading, error } = useQuery<MoviesResponse>({
    queryKey: ['popularMovies', page],
    queryFn: () => getPopularMovies(page),
    enabled: !!page,
    retry: shouldRetry,
    throwOnError: handleError
  })

  return { data, isLoading, error }
}

export const useTrendingMovies = (page: number) => {
  const { data, isLoading, error } = useQuery<MoviesResponse, any>({
    queryKey: ['trendingMovies', page],
    queryFn: () => getTrendingMovies(page),
    enabled: !!page,
    retry: shouldRetry,
    throwOnError: handleError
  })

  return { data, isLoading, error }
}
export const useDetailsMovies = (movieId: string) => {
  const { data, isLoading, error } = useQuery<MoviesResponse, any>({
    queryKey: ['detailsMovies', movieId],
    queryFn: () => getdetailsMovies(movieId),
    enabled: !!movieId,
    retry: shouldRetry,
    throwOnError: handleError
  })

  return { data, isLoading, error }
}

export const useCast = (movieId: string) => {
  const { data, isLoading, error } = useQuery<CastResponse, any>({
    queryKey: ['castMovies', movieId],
    queryFn: () => getCast(movieId),
    enabled: !!movieId,
    retry: shouldRetry,
    throwOnError: handleError
  })

  return { data, isLoading, error }
}
