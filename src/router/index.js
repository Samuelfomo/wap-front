import { createRouter, createWebHistory } from 'vue-router';
import Login from "@public/login.vue";
import Check from "@public/check-user.vue";
import Home from "@public/home.vue";
const routes = [

  {
    path: '/',
    name: 'check',
    component: Check
  },
  {
    path: '/:login?',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
