import axios from 'axios'

const apiToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGJhOGJlOTRhMjk4NTFiMmY4MzM0MWUwMWM5ZjBlZCIsIm5iZiI6MTcyODU2NTI3OC43OTg1MjMsInN1YiI6IjY3MDdjYTI1MWQ5NmRjNmQ0NzZhMzAxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Od7JggNoj2eJzQ21VuofASnW81UsCizDw1XyPSFcGEQ'

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${apiToken}`
  }
})

export default apiClient
