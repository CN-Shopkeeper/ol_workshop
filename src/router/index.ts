import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/overview"
  },
  {
    path: "/overview",
    name: "overview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "overview" */ "@/views/overview/overview.vue")
  },
  {
    path: "/basic",
    name: "basic",
    component: () =>
      import(/* webpackChunkName: "basic" */ "@/views/basic/basic.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
