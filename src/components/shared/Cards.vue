<!-- <template>
  <div class="card bg-base-100 w-full">
    <figure class="card-side">
      <img
        class="w-full h-90"
        src="https://media.themoviedb.org/t/p/w220_and_h330_face/kblxjPVIXaIQ7iHo5b2LaBOEllD.jpg"
        alt="Shoes"
      />
    </figure>
    <div class="card-actions justify-end -mt-[36px]">
      <div
        class="radial-progress progress-success bg-primary text-primary-content border-primary border-4"
        style="--value: 70; --size: 3rem"
        role="progressbar"
      >
        70%
      </div>
    </div>
    <div class="px-4 pb-4">
      <h2 class="card-title">Ted 2</h2>
      <p>05 de set de 2024</p>
    </div>
  </div>
</template> -->

<template>
  <div class="card bg-base-100 w-full">
    <figure class="card-side">
      <img class="w-full h-90" :src="`${baseURL}${imagem}`" :alt="title" />
    </figure>
    <div class="card-actions justify-end -mt-[36px]">
      <div
        class="radial-progress progress-success bg-primary text-primary-content border-primary border-4"
        style="--value: 70; --size: 3rem"
        role="progressbar"
      >
        70%
      </div>
    </div>
    <div class="px-4 pb-4">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  data: string
  imagem: string
  acceptance: string
}

const baseURL = 'https://media.themoviedb.org/t/p/w220_and_h330_face'

defineProps<Props>()
</script>
