import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '@/components/Admin'
import Game from '@/components/Game'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Admin
    },
    {
        path: '/game',
        component: Game
    }
]

const router = new VueRouter({
    routes
})

export default router
