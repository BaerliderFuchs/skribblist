import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/credits",
    name: "Credits",
    component: () =>
      import("../views/Credits.vue"),
  },
  {
    path: "/changelog",
    name: "Changelog",
    component: () =>
      import("../views/Changelog.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import("../views/Settings.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
