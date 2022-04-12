import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Character from '../views/Character.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {name : 'Home'},
      
    },
    {
      path: '/characters',
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
})

export default router
