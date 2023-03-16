import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dive-calculator',
      name: 'dive_calculator',
      component: () => import('../views/DiveCalculator.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/dive-log',
      name: 'dive_log',
      component: () => import('../views/diveLog/DiveLogListView.vue'),
      beforeEnter: (to, fromkl) => {
        if (!useUserStore().is_logged_in) {
          return false;
        }
      }
    },
  ]
})

export default router
