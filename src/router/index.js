import Vue from "vue";
import VueRouter from "vue-router";

import Profile from "../views/Profile.vue";
import Quays from "../views/Quays.vue";
import QuayDetail from "../views/QuayDetail.vue";
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
    path: "/quay/:quaycode",
    component: QuayDetail,
    name: "QuayDetail",
  },
  {
    path: "/halteknop",
    name: "Halteknop",
    component: Halteknop,
  },
  {
    path: "/halteknop/:page",
    name: "Halteknop",
    component: Halteknop,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
