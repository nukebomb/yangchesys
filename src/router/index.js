import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Analysis from '@/pages/Analysis'
import Control from '@/pages/Control'
import Correction from '@/pages/Correction'
import Helpdoc from '@/pages/Helpdoc.vue'
import test from '@/pages/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis
    },
    {
      path: '/control',
      name: 'Control',
      component: Control
    },
    {
      path: '/correction',
      name: 'Correction',
      component: Correction
    },
    {
      path: '/helpdoc',
      name: 'Helpdoc',
      component: Helpdoc
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
