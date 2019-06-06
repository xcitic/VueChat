import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/views/Landing'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
