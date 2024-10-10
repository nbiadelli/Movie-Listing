<template>
  <div>
    <h2 class="card-title text-[1.5rem] font-semibold">{{ title }}</h2>
    <div class="flex space-x-4 overflow-x-auto mt-6">
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
      <div class="flex-none w-64"><Cards /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cards from '@/components/shared/Cards.vue'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ScrollerWrap',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
