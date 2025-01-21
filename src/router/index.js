import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '@/stores/loginStore'

import Login from "@public/login.vue";
import Check from "@public/check-user.vue";
import Home from "@public/home.vue";
import Service from "@public/form-message.vue";
import Contact from "@public/contact.vue";
import Compte from "@public/parameter/compte.vue";
import Campagne from "@public/form-campagne.vue";
import Chart from "@public/chart.vue";

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
    component: Home,
    meta: { requiresAuth: true }  // Route protégée
  },
  {
    path: '/service',
    name: 'service',
    component: Service,
    meta: { requiresAuth: true }  // Route protégée
  },
{
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: { requiresAuth: true }  // Route protégée
  },
  {
    path: '/compte',
    name: 'compte',
    component: Compte,
    meta: { requiresAuth: true }  // Route protégée
  },
  {
    path: '/campagne',
    name: 'campagne',
    component: Campagne,
    meta: { requiresAuth: true }  // Route protégée
  },
  {
    path: '/chart',
    name: 'chart',
    component: Chart,
    meta: { requiresAuth: true }  // Route protégée
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navigation
router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore()
  const isAuthenticated = loginStore.isLoggedIn

  // Si la route nécessite une authentification et l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Rediriger vers la page de login
    next({
      name: 'check',
      // Sauvegarder la route initiale pour redirection après login
      query: { redirect: to.fullPath }
    })
  } else {
    // Sinon, continuer normalement
    next()
  }
})

export default router;

 // import { createRouter, createWebHistory } from 'vue-router';
 //
 // import Login from "@public/login.vue";
 // import Check from "@public/check-user.vue";
 // import Home from "@public/home.vue";
 // import Service from "@public/form-message.vue";
 // import Contact from "@public/contact.vue";
 // import Compte from "@public/parameter/compte.vue";
 // import Campagne from "@public/form-campagne.vue";
 // import Chart from "@public/chart.vue";
 //
 // const routes = [
 //
 // {
 // path: '/',
 // name: 'check',
 // component: Check
 // },
 // {
 // path: '/login?',
 // name: 'login',
 // component: Login
 // },
 // {
 // path: '/home',
 // name: 'home',
 // component: Home
 // },
 // {
 // path: '/service',
 // name: 'service',
 // component: Service
 // },
 // {
 // path: '/compte',
 // name: 'compte',
 // component: Compte
 // },
 // {
 // path: '/campagne',
 // name: 'campagne',
 // component: Campagne
 // },
 // {
 // path: '/contact',
 // name: 'contact',
 // component: Contact
 // },
 // {
 // path: '/chart',
 // name: 'chart',
 // component: Chart
 // }
 // ];
 //
 // const router = createRouter({
 // history: createWebHistory(),
 // routes,
 // });
 //
 //
 // export default router;



