<template>
  <div>
    <h2 class="card-title text-[1.5rem] font-semibold">{{ props.title }}</h2>
    <div class="flex space-x-4 overflow-x-auto mt-6">
      <div class="flex space-x-4 overflow-x-auto mt-6">
        <div v-for="item in list" :key="item.id" class="flex-none w-64">
          <router-link :to="{ name: 'movie-details', params: { id: item.id } }">
            <Cards
              :title="(item as Movie).title || (item as CastDetails).name"
              :date="(item as Movie).release_date || (item as CastDetails).character"
              :imagem="(item as Movie).poster_path || (item as CastDetails).profile_path"
              :acceptance="(item as Movie).vote_average"
              :idCard="item.id"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends Movie | CastDetails">
import Cards from '@/components/shared/Cards.vue'
import type { Movie, CastDetails } from '../../server/movie.types'

const props = defineProps<{
  title?: string
  list?: T[]
}>()
</script>
