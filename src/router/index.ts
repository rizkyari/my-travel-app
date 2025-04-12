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
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to,_from,next) => {
    const loggedIn = !!localStorage.getItem('token')

    if(to.meta.requiresAuth && !loggedIn){
        next('/login')
    }else{
        next()
    }
})

export default router;