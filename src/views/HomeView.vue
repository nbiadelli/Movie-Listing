<template>
  <main>
    <div class="p-4 md:p-10 lg:p-20">
      <div
        class="bg-[url('https://png.pngtree.com/background/20230618/original/pngtree-blank-movie-ticket-with-popcorn-bucket-filmstrip-clapperboard-and-camera-in-picture-image_3709549.jpg')] h-64 w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-3xl lg:text-5xl font-bold">Bem-Vindo(a).</h1>
        <h3 class="text-lg lg:text-xl mt-2">
          Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.
        </h3>
        <div class="mt-4 w-full max-w-md">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              v-model="search"
              class="grow p-2"
              placeholder="Search"
              @keyup.enter="redirectToAbout"
            />
          </label>
        </div>
      </div>
      <div v-if="!popularLoading && !trendingLoading">
        <div class="mt-8">
          <ScrollerWrap title="Populares" :list="popularMovies"></ScrollerWrap>
        </div>
        <div class="mt-8">
          <ScrollerWrap title="Tendencia" :list="trendingMovies"></ScrollerWrap>
        </div>
      </div>
      <div v-else class="mt-32 flex justify-center items-center">
        <span class="loading loading-ball loading-xs"></span>
        <span class="loading loading-ball loading-sm"></span>
        <span class="loading loading-ball loading-md"></span>
        <span class="loading loading-ball loading-lg"></span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePopularMovies, useTrendingMovies } from '@/composables/useMovies'
import { useMovieStore } from '@/stores/moviesStore'
import ScrollerWrap from '@/components/layout/ScrollerWrap.vue'
const route = useRoute()
const router = useRouter()

const popularMoviesStore = useMovieStore()
const trendingMoviesStore = useMovieStore()
const page = ref(1)

const search = ref(route.query.search || '')

const {
  data: popularData,
  isLoading: popularLoading,
  error: popularError
} = usePopularMovies(page.value)
const {
  data: trendingData,
  isLoading: trendingLoading,
  error: trendingError
} = useTrendingMovies(page.value)

function redirectToAbout() {
  router.push(`/movie/search-result/${search.value}`)
}

search.value = route.query.search || ''

watchEffect(() => {
  if (popularData.value) {
    popularMoviesStore.savePopularMovies(popularData.value)
  }
  if (trendingData.value) {
    trendingMoviesStore.saveTrendingMovies(trendingData.value)
  }
})

const popularMovies = computed(() => popularData.value?.results || [])
const trendingMovies = computed(() => trendingData.value?.results || [])
</script>
