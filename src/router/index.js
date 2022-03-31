import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import CreateRoomView from '../views/CreateRoomView.vue'
import JoinRoomView from '../views/JoinRoomView.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: AboutView
    },
    {
        path: '/createroom',
        name: 'createroom',
        component: CreateRoomView,
    },
    {
        path: '/joinroom',
        name: 'joinroom',
        component: JoinRoomView,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
