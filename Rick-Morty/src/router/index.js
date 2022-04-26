import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Character from "../views/Character.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "Home" },
    },
    {
      path: "/characters",
      name: "Home",
      component: Home,
    },
    {
      path: "/character/:id",
      name: "character",
      component: Character,
    },
  ],
});

export default router;
