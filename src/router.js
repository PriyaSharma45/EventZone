import Vue from 'vue'
import Router from 'vue-router'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import EventCreation from './components/EventCreation'

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
    component: Dashboard,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'EventCreation',
    component: EventCreation,
    meta: { 
      requiresAuth: true
    }
  }
]

export default new Router({ mode: 'history', routes })