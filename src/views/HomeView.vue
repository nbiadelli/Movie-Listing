<template>
  <main>
    <div class="p-4 md:p-10 lg:p-20">
      <div
        class="bg-[url('https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp')] h-64 w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-3xl lg:text-5xl font-bold">Bem-Vindo(a).</h1>
        <h3 class="text-lg lg:text-xl mt-2">
          Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.
        </h3>
        <div class="mt-4 w-full max-w-md">
          <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow p-2" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div class="mt-8">
        <ScrollerWrap title="Populares" :list="popularMovies"></ScrollerWrap>
      </div>
      <div class="mt-8">
        <ScrollerWrap title="Tendencia" :list="trendingMovies"></ScrollerWrap>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { usePopularMovies, useTrendingMovies } from '@/composables/useMovies'
import { useMovieStore } from '@/stores/moviesStore'
import ScrollerWrap from '@/components/layout/ScrollerWrap.vue'

const popularMoviesStore = useMovieStore()
const trendingMoviesStore = useMovieStore()
const page = ref(1)

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
