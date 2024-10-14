<template>
  <div>
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <div class="card bg-base-100 w-100" v-if="!imageLoaded">
        <div class="skeleton h-96 w-100"></div>
      </div>
      <figure>
        <img
          class="h-96 w-100"
          :src="`${baseURL}${detailsMovies.backdrop_path}`"
          alt="Album"
          loading="lazy"
          @load="onImageLoad"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{{ detailsMovies.title }}</h2>
        <div class="flex flex-row">
          <div class="mr-6" v-for="item in detailsMovies.genres" :key="item.id">
            {{ item.name }}
          </div>
        </div>
        <div class="flex flex-wrap mt-6">
          <div><Progress :acceptance="detailsMovies.vote_average" /></div>
          <div class="p-4">Avaliação dos usuários</div>
        </div>
        <div class="mt-8">
          <h3 class="card-title">Sinopse</h3>
          <div class="max-w-7xl">{{ detailsMovies.overview }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Progress from './Progress.vue'

import { defineProps } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  detailsMovies: {
    type: Object,
    required: true
  }
})
const baseURL = 'https://media.themoviedb.org/t/p/w220_and_h330_face'
const imageLoaded = ref(false)

const onImageLoad = () => {
  imageLoaded.value = true
}
</script>
