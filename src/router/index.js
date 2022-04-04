import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import CreateRoomView from '../views/CreateRoomView.vue'
import JoinRoomView from '../views/JoinRoomView.vue'
import WaitingRoomView from '../views/WaitingRoomView.vue'
import InRoomView from '../views/InRoomView.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'God of Avalon'
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: AboutView,
        meta: {
            title: 'God of Avalon'
        }
    },
    {
        path: '/createroom',
        name: 'createroom',
        component: CreateRoomView,
        meta: {
            title: 'God of Avalon'
        }
    },
    {
        path: '/joinroom',
        name: 'joinroom',
        component: JoinRoomView,
        meta: {
            title: 'God of Avalon'
        }
    },
    {
        path: '/waitingroom',
        name: 'waitingroom',
        component: WaitingRoomView,
        meta: {
            title: 'God of Avalon'
        }
    },
    {
        path: '/inroom',
        name: 'inroom',
        component: InRoomView,
        meta: {
            title: 'God of Avalon'
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
