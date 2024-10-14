import './assets/main.css'
import './app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(createPinia())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Configuração de exemplo: tenta novamente 2 vezes se houver erro
      refetchOnWindowFocus: true // Desabilita o refetch ao focar a janela
    }
  }
})

app.use(VueQueryPlugin, { queryClient })
app.use(router)

app.mount('#app')
