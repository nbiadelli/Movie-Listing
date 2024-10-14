import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: () => import('../views/DetailsView.vue')
    },
    {
      path: '/movie/search-result/:search',
      name: 'movie-search',
      component: () => import('../views/SearchResultView.vue')
    }
  ]
})

export default router
