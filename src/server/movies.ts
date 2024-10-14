import apiClient from './client'
import type { MoviesResponse, CastResponse } from './movie.types'

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

export const getdetailsMovies = async (movie_id: string): Promise<MoviesResponse> => {
  try {
    const response = await apiClient.get(`/movie/${movie_id}?language=pt-BR`)
    return response.data
  } catch (error) {
    throw (error as any).status
  }
}

export const getCast = async (movie_id: string): Promise<CastResponse> => {
  try {
    const response = await apiClient.get(`/movie/${movie_id}/credits`)
    return response.data
  } catch (error) {
    throw (error as any).status
  }
}

export const getSearch = async (search: string, page: number): Promise<MoviesResponse> => {
  console.log('getSearch', page)
  try {
    const response = await apiClient.get(
      `search/movie?query=${search}&include_adult=false&language=pt-BR&page=${page}`
    )
    return response.data
  } catch (error) {
    throw (error as any).status
  }
}
