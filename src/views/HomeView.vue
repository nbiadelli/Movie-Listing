<template>
  <main>
    <div class="p-4 md:p-10 lg:p-20">
      <div
        class="bg-[url('assets/img/banner.png')] h-64 w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-3xl lg:text-5xl font-bold">Bem-Vindo(a).</h1>
        <h3 class="text-lg lg:text-xl md:place-items-center mt-2 font-bold">
          Milhões de Filmes para Descobrir. Explore já.
        </h3>
        <div class="mt-4 w-full max-w-md">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              v-model="search"
              class="grow p-2"
              placeholder="Pesquisar"
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
          <ScrollerWrap title="Tendência" :list="trendingMovies"></ScrollerWrap>
        </div>
      </div>
      <div v-else class="mt-32 flex justify-center items-center">
        <Loading />
      </div>
      <div class="p-4 md:p-10 text-5xl flex justify-center card-title">
        {{ errorMessage }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePopularMovies, useTrendingMovies } from '@/composables/useMovies'
import ScrollerWrap from '@/components/layout/ScrollerWrap.vue'
import Loading from '@/components/shared/Loading.vue'
import { errorMessage } from '../composables/useMovies'

const route = useRoute()
const router = useRouter()

const page = ref(1)

const search = ref(route.query.search || '')

const { data: popularData, isLoading: popularLoading } = usePopularMovies(page.value)
const { data: trendingData, isLoading: trendingLoading } = useTrendingMovies(page.value)

function redirectToAbout() {
  router.push(`/movie/search-result/${search.value}`)
}

search.value = route.query.search || ''

const popularMovies = computed(() => popularData.value?.results || [])
const trendingMovies = computed(() => trendingData.value?.results || [])
</script>
