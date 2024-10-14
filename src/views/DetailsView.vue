<template>
  <main>
    <div class="p-4 md:p-10 lg:p-20">
      <DetailsCard :detailsMovies="movieDetails" />
    </div>
    <div class="p-4 md:p-10 lg:p-20">
      <ScrollerWrap title="Elenco principal" :list="cast.cast"></ScrollerWrap>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import DetailsCard from '@/components/shared/DetailsCard.vue'
import { useDetailsMovies, useCast } from '../composables/useMovies'
import ScrollerWrap from '../components/layout/ScrollerWrap.vue'
// import type { MoviesResponse, CastResponse, CastDetails } from '@/server/movie.types'
const route = useRoute()
const userId = route.params.id

const movieId = ref(userId)
const movieCast = ref(userId)

const setMovieId = (id: string) => {
  movieId.value = id
  movieCast.value = id
}

const { data: movieDetails } = useDetailsMovies(movieId.value)
const { data: cast } = useCast(movieId.value)

watchEffect(() => {
  if (movieId.value) {
    setMovieId
  }
})
</script>
