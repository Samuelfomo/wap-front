import { createRouter, createWebHistory } from 'vue-router';
import Login from "@public/login.vue";
import Check from "@public/check-user.vue";
import Home from "@public/home.vue";
import Form_Message from "@public/form-message.vue";
import Compte from "@public/parameter/compte.vue";
import Campagne from "@public/form-campagne.vue";

const routes = [

  {
    path: '/',
    name: 'check',
    component: Check
  },
  {
    path: '/login?',
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
  },
  {
    path: '/compte',
    name: 'compte',
    component: Compte
  },
  {
    path: '/campagne',
    name: 'campagne',
    component: Campagne
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
