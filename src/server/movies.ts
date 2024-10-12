import apiClient from './client'
import type { MoviesResponse } from './movie.types'

export const getPopularMovies = async (page: number): Promise<MoviesResponse> => {
  try {
    const response = await apiClient.get(
      `/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`
    )
    return response.data
  } catch (error) {
    throw (error as any).status
  }
}

export const getTrendingMovies = async (page: number): Promise<MoviesResponse> => {
  try {
    const response = await apiClient.get(`/trending/movie/day?language=pt-BR&page=${page}`)
    return response.data
  } catch (error) {
    throw (error as any).status
  }
}
