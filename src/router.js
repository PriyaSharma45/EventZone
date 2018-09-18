import Vue from 'vue'
import Router from 'vue-router'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

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
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

export default new Router({ mode: 'history', routes })