<template>
  <main>
    <div class="p-4 md:p-10 lg:p-20">
      <div v-if="!isLoading">
        <div v-for="item in resultSearch?.results" :key="item.id" class="p-4">
          <router-link :to="{ name: 'movie-details', params: { id: item.id } }">
            <div class="card lg:card-side bg-base-100 shadow-xl">
              <div class="card bg-base-100 w-100" v-if="!imageLoaded">
                <div class="skeleton h-96 w-100"></div>
                {{ imageLoaded }}
              </div>
              <div>
                <figure v-if="item.poster_path" class="h-80">
                  <img
                    v-if="item.poster_path"
                    class="w-72"
                    :src="`${baseURL}${item.poster_path}`"
                    alt="Movie"
                    loading="lazy"
                    @load="onImageLoad"
                  />
                </figure>
                <figure v-else class="h-80">
                  <img
                    class="p-4 w-72"
                    src="../assets/img/skeleton.svg"
                    alt="Movie"
                    loading="lazy"
                    @load="onImageLoad"
                  />
                </figure>
              </div>

              <div class="card-body">
                <h2 class="card-title text-3xl">{{ item.title }}</h2>
                <p class="max-w-7xl text-lg mt-16">{{ item.overview }}</p>
                <p v-if="!item.overview" class="max-w-7xl text-lg mt-16">Filme sem descrição</p>
              </div>
            </div>
          </router-link>
        </div>
        <div v-if="resultSearch.total_pages > 1" class="flex justify-center mt-8 space-x-4">
          <button
            @click="previousPage"
            :disabled="!hasPreviousPage()"
            class="btn btn-primary bg-primary text-primary-content border-primary"
          >
            Anterior
          </button>
          <span>Página {{ resultSearch?.page }}</span>
          <button
            @click="nextPage"
            :disabled="!hasNextPage()"
            class="btn btn-primary bg-primary text-primary-content border-primary"
          >
            Próxima
          </button>
        </div>
      </div>
      <div v-else class="mt-32 flex justify-center items-center">
        <Loading />
      </div>
    </div>

    <div
      v-if="!resultSearch?.results.length && !isLoading"
      class="p-4 md:p-10 text-3xl flex justify-center card-title"
    >
      Filme não encontrado.
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { handleError, shouldRetry } from '../composables/useMovies'
import type { MoviesResponse } from '@/server/movie.types'
import { getSearch } from '@/server/movies'
import Loading from '@/components/shared/Loading.vue'
import { baseURL } from '../utils/helpers'

const route = useRoute()
const search = route.params.search as string | undefined
const page = ref(1)

const { data: resultSearch, isLoading } = useQuery<MoviesResponse, Error>({
  queryKey: ['search', search, page],
  queryFn: () => getSearch(search ?? '', page.value),
  enabled: Boolean(search),
  retry: shouldRetry,
  throwOnError: handleError
})

const nextPage = () => {
  page.value++
}

const hasNextPage = () => {
  return (resultSearch?.value?.page || 0) < (resultSearch?.value?.total_pages || 0)
}

const hasPreviousPage = () => {
  return (resultSearch.value?.page || 0) > 1
}

const previousPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const imageLoaded: { value: boolean } = ref(false)

const onImageLoad = () => {
  imageLoaded.value = true
}
</script>
