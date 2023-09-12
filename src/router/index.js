import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/user";
import HomeView from '../views/HomeView.vue'
import AuthProvider from "../providers/AuthProvider";
import DiveCalculator from "@/views/DiveCalculator.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DiveLogListView from "@/views/diveLog/DiveLogListView.vue";
import DiveLogView from "@/views/diveLog/DiveLogView.vue";
import DiveLogCreate from "@/views/diveLog/DiveLogCreate.vue";

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
            component: DiveCalculator,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/dive-log',
            name: 'dive_log',
            component: DiveLogListView,
            beforeEnter: (to, from) => {
                if (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken()) {
                    return false;
                }
            },
        },
        {
            path: '/dive-log-view/:id',
            name: 'dive_log_view',
            component: DiveLogView,
            beforeEnter: (to, from) => {
                if (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken()) {
                    return false;
                }
            }
        },
        {
            path: '/dive-log-create',
            name: 'dive_log_create',
            component: DiveLogCreate,
            beforeEnter: (to, from) => {
                if (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken()) {
                    return false;
                }
            }
        },
    ]
});

export default router;
