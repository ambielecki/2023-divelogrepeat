import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/user";
import HomeView from '../views/HomeView.vue'
import AuthProvider from "../providers/AuthProvider";
import DiveCalculator from "@/views/DiveCalculator.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import BlogItemView from "@/views/blog/BlogItemView.vue";
import BlogList from "@/views/blog/BlogList.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";

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
            path: '/forgot-password',
            name: 'forgot_password',
            component: ForgotPassword,
        },
        {
            path: '/password-reset',
            name: 'reset_password',
            component: ResetPassword,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/blog/:slug',
            name: 'blog_view',
            component: () => import('../views/blog/BlogItemView.vue'),
        },
        {
            path: '/blog',
            name: 'blog_list',
            component: BlogList,
        },
        {
            path: '/dive-log',
            name: 'dive_log',
            component: () => import('../views/diveLog/DiveLogListView.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken()) {
                    return false;
                }
            },
        },
        {
            path: '/dive-log-view/:id',
            name: 'dive_log_view',
            component: () => import('../views/diveLog/DiveLog.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken()) {
                    return false;
                }
            }
        },
        {
            path: '/dive-log-create',
            name: 'dive_log_create',
            component: () => import('../views/diveLog/DiveLogCreate.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken()) {
                    return false;
                }
            }
        },
        {
            path: '/admin/home',
            name: 'edit_home',
            component: () => import('../views/admin/HomePageEdit.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().getIsAdmin() || (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken())) {
                    return false;
                }
            }
        },
        {
            path: '/admin/image/upload',
            name: 'image_upload',
            component: () => import('../views/admin/image/ImageUpload.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().getIsAdmin() || (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken())) {
                    return false;
                }
            }
        },
        {
            path: '/admin/image',
            name: 'image_list',
            component: () => import('../views/admin/image/ImageList.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().getIsAdmin() || (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken())) {
                    return false;
                }
            }
        },
        {
            path: '/admin/blog',
            name: 'admin_blog_list',
            component: () => import('../views/admin/blog/BlogPageList.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().getIsAdmin() || (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken())) {
                    return false;
                }
            }
        },
        {
            path: '/admin/blog/create',
            name: 'blog_create',
            component: () => import('../views/admin/blog/BlogPageCreate.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().getIsAdmin() || (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken())) {
                    return false;
                }
            }
        },
        {
            path: '/admin/blog/:id',
            name: 'blog_edit',
            component: () => import('../views/admin/blog/BlogPageEdit.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().getIsAdmin() || (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken())) {
                    return false;
                }
            }
        },
        {
            path: '/admin',
            name: 'admin_index',
            component: () => import('../views/admin/Admin.vue'),
            beforeEnter: (to, from) => {
                if (!useUserStore().getIsAdmin() || (!useUserStore().is_logged_in && !AuthProvider.checkCachedToken())) {
                    return false;
                }
            }
        },
    ]
})

export default router
