export interface Movie {
  poster_path: string
  id: number
  title: string
  vote_average: number
  release_date: string
  overview: string
}

export interface MoviesResponse {
  results: Movie[]
}

export interface CastDetails {
  id: number
  name: string
  profile_path: string
  character: string
}
;[]

export interface CastResponse {
  results: CastDetails[]
}
