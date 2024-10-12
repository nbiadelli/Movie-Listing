<template>
  <div>
    <h2 class="card-title text-[1.5rem] font-semibold">{{ title }}</h2>
    <div class="flex space-x-4 overflow-x-auto mt-6">
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="text-center">Carregando...</div>

      <!-- Error Handling -->
      <div v-if="error" class="text-center text-red-500">Erro: {{ error }}</div>

      <!-- Movie List -->
      <div v-else class="flex space-x-4 overflow-x-auto mt-6">
        <div v-for="movie in list" :key="movie.id" class="flex-none w-64">
          <Cards
            :title="movie.title"
            data="05 de set de 2024"
            :imagem="movie.poster_path"
            acceptance="2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, defineProps } from 'vue'
import { usePopularMovies } from '@/composables/useMovies'
import Cards from '@/components/shared/Cards.vue'

interface Movie {
  id: number
  title: string
  poster_path: string
}

// Tipagem dos props recebidos
const props = defineProps<{
  title?: string
  list: Movie[]
}>()

// Definir página para carregamento de filmes populares
const page = ref(1)
const { isLoading, error } = usePopularMovies(page.value)

watchEffect(() => {
  console.log('Lista de filmes recebida:', props.list)
})
</script>
