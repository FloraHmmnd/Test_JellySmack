import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Character from '../views/Character.vue'

const routes = [
  {
    path: '/character',
    name: 'Home',
    props: true,
    component: Home
  },
  
  {
    path: '/character/:id',
    name: 'character',
    props: true, 
    component: Character 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
