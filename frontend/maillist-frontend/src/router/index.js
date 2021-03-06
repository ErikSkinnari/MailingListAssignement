import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store.js'
import NotFound from '../components/404.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/UserInfo.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        path: '/profile',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router