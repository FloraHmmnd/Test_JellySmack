import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";

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
      component: HomeView,
    },
    {
      path: "/character/:id",
      name: "character",
      component: CharacterView,
    },
  ],
});

export default router;
