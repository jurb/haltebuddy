import Vue from "vue";
import VueRouter from "vue-router";

import Profiel from "../views/Profiel.vue";
import Haltes from "../views/Haltes.vue";
import Kaart from "../views/Kaart.vue";
import Halteknop from "../views/Halteknop.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Haltes",
    component: Haltes,
  },
  {
    path: "/profiel",
    name: "Profiel",
    // route level code-splitting
    // this generates a separate chunk (profiel.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profiel" */ "../views/Profiel.vue"),
  },
  {
    path: "/kaart",
    name: "Kaart",
    component: () =>
      import(/* webpackChunkName: "kaart" */ "../views/Kaart.vue"),
  },
  {
    path: "/halteknop",
    name: "Halteknop",
    component: () =>
      import(/* webpackChunkName: "halteknop" */ "../views/Halteknop.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
