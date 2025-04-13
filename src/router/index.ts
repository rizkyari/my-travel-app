import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../pages/Register.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/articles',
        name: 'Articles',
        component: () => import('../pages/Articles.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/articles/:documentId',
        name: 'ArticleDetail',
        component: () => import('../pages/ArticleDetail.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/articles/create',
        name: 'CreateArticle',
        component: () => import('../pages/CreateArticle.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../pages/Profile.vue'),
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

router.beforeEach((to,_from,next) => {
    const loggedIn = !!localStorage.getItem('token')

    if((to.name === 'Login' || to.name === 'Register') && loggedIn){
        next('/articles')
        return
    }

    if(to.meta.requiresAuth && !loggedIn){
        next('/login')
        return
    }
        
    next()
    
})

export default router;