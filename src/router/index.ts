import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/animes/pages/1',
    meta:{}
  },
  {
    path: '/animes/pages/:pageNum',
    name: 'Anime',
    component: () => import('../views/AnimeView.vue'),
  },
  {
    path: '/animes/searching/pages/:pageNum',
    name: 'SearchingAnime',
    component: () => import('../views/SearchingAnimeView.vue')
  },
  {
    path: '/animes/:animeID/series/:seriesID',
    name: 'AnimeVideo',
    component: () => import('../views/VideoView.vue')
  },
  {
    path: '/animes/:id',
    name: 'AnimeInfo',
    component: () => import('../views/AnimeInfo.vue')
  },
  {
    path:'*',
    name: 'Anime',
    component: () => import('../views/AnimeView.vue'), //404 TODO
  }
]

const router = new VueRouter({
  routes
})

export default router
