import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Songs from '@/components/Songs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    }
  ]
})
