<script setup lang="ts">
import ScrollerWrap from '@/components/layout/ScrollerWrap.vue'
</script>

<template>
  <main>
    <div class="p-4 md:p-10 lg:p-20">
      <div
        class="bg-[url('https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp')] h-64 w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
      >
        <h1 class="text-3xl lg:text-5xl font-bold">Bem-Vindo(a).</h1>
        <h3 class="text-lg lg:text-xl mt-2">
          Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.
        </h3>
        <div class="mt-4 w-full max-w-md">
          <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow p-2" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div class="mt-8">
        <ScrollerWrap title="Tendências"></ScrollerWrap>
      </div>
      <div class="mt-8">
        <ScrollerWrap title="Populares"></ScrollerWrap>
      </div>

      <!-- <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8"
      >
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
        <div><Cards /></div>
      </div> -->
    </div>
  </main>
</template>
