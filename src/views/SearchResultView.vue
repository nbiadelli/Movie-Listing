<template>
  <main>
    <div class="p-4 md:p-10 lg:p-20">
      <div v-for="item in resultSearch.results" :key="item.id" class="p-4">
        <router-link :to="{ name: 'movie-details', params: { id: item.id } }">
          <div class="card card-side bg-base-100 shadow-xl">
            <figure>
              <img :src="`${baseURL}${item.poster_path}`" alt="Movie" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ item.title }}</h2>
              <p class="max-w-7xl">{{ item.overview }}</p>
            </div>
          </div>
        </router-link>
      </div>

      <div v-if="resultSearch.total_pages > 20" class="flex justify-center mt-8 space-x-4">
        <button
          @click="previousPage"
          :disabled="page.value === 1"
          class="btn btn-primary bg-primary text-primary-content border-primary"
        >
          Anterior
        </button>
        <span class="bg-base-100">Página {{ resultSearch.page }}</span>
        <button
          @click="nextPage"
          :disabled="!resultSearch || resultSearch.results.length === 0"
          class="btn btn-primary bg-primary text-primary-content border-primary"
        >
          Próxima
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watchEffect, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { handleError, shouldRetry } from '../composables/useMovies'
import type { MoviesResponse } from '@/server/movie.types'
import { getSearch } from '@/server/movies'

const route = useRoute()
const search: any = route.params.search
const page = ref(1)
const baseURL = 'https://media.themoviedb.org/t/p/w220_and_h330_face'
console.log('paginaaaaa', page.value)

const {
  data: resultSearch,
  isLoading,
  error
} = useQuery<MoviesResponse, any>({
  queryKey: ['search', search, page],
  queryFn: () => getSearch(search, page.value),
  enabled: !!search,
  retry: shouldRetry,
  throwOnError: handleError
})

const nextPage = () => {
  page.value++
}

const previousPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

watch(page, () => {})

watchEffect(() => {
  if (search) {
    resultSearch
  }
})
</script>
