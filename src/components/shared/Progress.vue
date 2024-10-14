<template>
  <div
    class="radial-progress progress-success bg-primary text-primary-content border-primary border-4"
    :style="{ '--value': porcentagem, '--size': '3rem' }"
    role="progressbar"
  >
    {{ porcentagem }}%
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
const props = defineProps<{
  acceptance: number
}>()

const porcentagem = ref<number | null>(null)

watchEffect(() => {
  const valorInteiro = Math.floor(props.acceptance * 10)

  if (valorInteiro < 100) {
    porcentagem.value = valorInteiro
  } else {
    const valorStr = valorInteiro.toString()
    porcentagem.value = parseInt(valorStr.slice(0, 2))
  }
})
</script>
