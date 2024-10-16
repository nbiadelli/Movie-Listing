export interface Movie {
  adult: boolean
  poster_path: string
  genreIds: number[]
  id: number
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  posterPath: string
  releaseDate: string
  title: string
  video: boolean
  voteAverage: number
  voteCount: number
}

export interface MoviesResponse {
  results: Movie[]
}
