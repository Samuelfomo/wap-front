import { createRouter, createWebHistory } from 'vue-router';
import Login from "@public/login.vue";
import Check from "@public/check-user.vue"
const routes = [

  {
    path: '/',
    name: 'check',
    component: Check
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
