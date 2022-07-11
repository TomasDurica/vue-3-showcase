import * as VueRouter from 'vue-router'
import IndexPage from '../pages/index-page.vue'
import DetailsPage from '../pages/details-page.vue'
import NotFoundPage from '../pages/not-found-page.vue'
import type { RouteLocationNormalized } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: IndexPage },
  { name: 'details', path: '/players/:id(\\d+)', component: DetailsPage, props: (to: RouteLocationNormalized) => ({ id: parseInt(to.params.id.toString())}) },
  { path: '/:pathMatch(.*)', component: NotFoundPage }  
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})