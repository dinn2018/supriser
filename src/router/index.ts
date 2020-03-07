import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/animes/pages/:pageNum',
    name: 'Anime',
    component: () => import('../views/AnimeView.vue')
  },
  {
    path: '/animes/searching/pages/:pageNum',
    name: 'SearchingAnime',
    component: () => import('../views/SearchingAnimeView.vue')
  },
  {
    path: '/animes/:animeID/series/:seriesID',
    name: 'AnimeSeries',
    component: () => import('../views/SeriesView.vue')
  },
  {
    path: '/animes/:id',
    name: 'AnimeInfo',
    component: () => import('../views/AnimeInfo.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
