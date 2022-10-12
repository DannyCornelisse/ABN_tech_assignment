import { createRouter, createWebHistory } from "vue-router";
import SearchView from "../views/SearchView.vue";
import ExploreView from "../views/ExploreView.vue";
import ShowDetailsView from "../views/ShowDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dearch",
      component: SearchView,
    },
    {
      path: "/explore",
      name: "dxplore",
      component: ExploreView,
    },
    {
      path: "/details/:id",
      name: "details",
      component: ShowDetailsView,
    },

  ],
});

export default router;
