import Vue from "vue";
import VueRouter from "vue-router";

import Profile from "../views/Profile.vue";
import Quays from "../views/Quays.vue";
import QuayMap from "../views/QuayMap.vue";
import Halteknop from "../views/Halteknop.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Quays",
    component: Quays,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/quay-map",
    name: "QuayMap",
    component: QuayMap,
  },
  {
    path: "/halteknop",
    name: "Halteknop",
    component: Halteknop,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
