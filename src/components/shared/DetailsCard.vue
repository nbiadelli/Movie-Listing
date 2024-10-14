<template>
  <div>
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <div class="card bg-base-100 w-100" v-if="!imageLoaded">
        <div class="skeleton h-full w-80"></div>
      </div>
      <figure v-if="props.detailsMovies.backdrop_path">
        <img
          class="h-full w-80"
          :src="`${baseURL}${props.detailsMovies.backdrop_path}`"
          alt="Album"
          loading="lazy"
          @load="onImageLoad"
        />
      </figure>
      <figure v-if="!props.detailsMovies.backdrop_path">
        <img
          class="p-4 h-full w-80"
          src="../../assets/img/skeleton.svg"
          alt="Movie"
          loading="lazy"
          @load="onImageLoad"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{{ props.detailsMovies.title }}</h2>
        <div class="flex flex-row">
          <div class="mr-6" v-for="item in props.detailsMovies.genres" :key="item.id">
            {{ item.name }}
          </div>
        </div>
        <div class="flex flex-wrap mt-6">
          <div><Progress :acceptance="props.detailsMovies.vote_average" /></div>
          <div class="p-4 text-lg">Avaliação dos usuários</div>
        </div>
        <div class="mt-8">
          <h3 class="card-title mb-4">Sinopse</h3>
          <div v-if="props.detailsMovies.overview" class="max-w-7xl text-lg">
            {{ props.detailsMovies.overview }}
          </div>
          <div v-else class="max-w-7xl text-lg">Filme sem descreção.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import Progress from './Progress.vue'
import { baseURL } from '../../utils/helpers'

const props = defineProps({
  detailsMovies: {
    type: Object,
    required: true
  }
})
const imageLoaded: { value: boolean } = ref(false)

const onImageLoad = () => {
  imageLoaded.value = true
}
</script>
