import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
    },
    {
        path: '/userLogin',
        name: 'userLogin',
        component: () => import( '@/views/userLogin.vue')
    },
    {
        path: '/homePage',
        name: 'home',
        component: () => import( '@/views/Home.vue')
    }

]

const router = new VueRouter({
    routes
})

export default router
