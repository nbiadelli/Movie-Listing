<template>
  <div class="card bg-base-100 w-100" :title="title">
    <div class="card bg-base-100 w-100" v-if="!imageLoaded">
      <div class="skeleton h-96 w-100"></div>
    </div>
    <div class="card bg-base-100 w-100" v-if="imagem">
      <img
        class="h-90"
        :src="`${baseURL}${imagem}`"
        :alt="title"
        loading="lazy"
        @load="onImageLoad"
      />
    </div>
    <div v-if="acceptance" class="card-actions justify-end -mt-[36px]">
      <Progress :acceptance="acceptance" />
    </div>
    <div class="px-4 pb-4">
      <h2 class="card-title truncate break-words">{{ title }}</h2>
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Progress from './Progress.vue'

const props = defineProps<{
  title?: string
  data?: string
  imagem: string
  acceptance?: number
  idCard?: number
}>()

const baseURL = 'https://media.themoviedb.org/t/p/w220_and_h330_face'
const imageLoaded = ref(false)

const onImageLoad = () => {
  imageLoaded.value = true
}
</script>
