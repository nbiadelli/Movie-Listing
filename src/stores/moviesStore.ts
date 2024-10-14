import { defineStore } from 'pinia'
import type { MoviesResponse } from '../server/movie.types'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    popularMovie: <MoviesResponse>{},
    trendingMovies: <MoviesResponse>{},
    errorMessage: <String>''
  }),

  actions: {
    async savePopularMovies(movies: MoviesResponse) {
      this.popularMovie = movies
    },
    async saveTrendingMovies(movies: MoviesResponse) {
      this.popularMovie = movies
    },
    async saveErrorMessage(error: string) {
      this.errorMessage = error
    }
  }
})
