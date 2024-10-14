<template>
  <main>
    <div v-if="!isLoading">
      <div class="p-4 md:p-10 lg:p-20">
        <DetailsCard :detailsMovies="movieDetails" />
      </div>
      <div class="p-4 md:p-10 lg:p-20">
        <ScrollerWrap title="Elenco principal" :list="cast?.cast"></ScrollerWrap>
      </div>
    </div>
    <div v-else class="mt-32 flex justify-center items-center">
      <Loading />
    </div>
    <div class="p-4 md:p-10 text-5xl flex justify-center card-title">
      {{ errorMessage }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDetailsMovies, useCast } from '../composables/useMovies'
import Loading from '@/components/shared/Loading.vue'
import DetailsCard from '@/components/shared/DetailsCard.vue'
import ScrollerWrap from '@/components/layout/ScrollerWrap.vue'
import { errorMessage } from '../composables/useMovies'

const route = useRoute()

const userId = route.params.id as string

const movieId = ref<string>(userId)

const { data: movieDetails, isLoading } = useDetailsMovies(movieId.value)
const { data: cast } = useCast(movieId.value)
</script>
