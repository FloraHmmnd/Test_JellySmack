import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Character from '../views/Character.vue'

const routes = [
  {
    path: '/character',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/character/:id',
    name: 'character',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Character //() => import(/* webpackChunkName: "about" */ '../views/Character.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
