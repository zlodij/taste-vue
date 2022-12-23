import { createRouter, createWebHistory } from 'vue-router'
import EasterEgg from '../components/EasterEgg.vue'
import Acls from '../views/Acls.vue'
import AclDetails from '../views/AclDetails.vue'
import About from '../views/About.vue'


const routes = [
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/acls',
        name: 'Acls',
        component: Acls
    },
    {
        path: '/acls/:id',
        name: 'AclDetails',
        component: AclDetails,
        props: true
    },
    {
        path: '/',
        name: "Home",
        redirect: '/acls'
    },
    {
        path: '/:catchAll(.*)',
        name: 'EasterEgg',
        component: EasterEgg
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router