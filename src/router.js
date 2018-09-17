import Vue from 'vue'
import Router from 'vue-router'
import Signup from './components/Signup'
import Login from './components/Login'

Vue.use(Router)

const routes = [
  { 
    path: '/',
    name: 'Signup',
    component: Signup 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login 
  }
]

export default new Router({ mode: 'history', routes })