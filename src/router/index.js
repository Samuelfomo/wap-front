import { createRouter, createWebHistory } from 'vue-router';
import Login from "@public/login.vue";
import Check from "@public/check-user.vue";
import Home from "@public/home.vue";
import Form_Message from "@public/form-message.vue";

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
  },
  {
    path: '/form-message',
    name: 'message',
    component: Form_Message
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
