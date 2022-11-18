import { createRouter, createWebHashHistory } from "vue-router";
import Meter from "@/views/Meter.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "",
    name: "",
    // redirect: "/home",
    component: Home,
    meta: { title: 'Rayz Meter Dashboard' },
  },
  {
    path: "/meter/:id",
    name: "Meter",
    component: Meter,
    meta: { title: 'Meter' },
    props: true,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});