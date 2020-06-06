import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    // 404 - page
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router