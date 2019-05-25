import Vue from 'vue'
import Router from 'vue-router'
import SignUpView from '@/views/SignUpView'
import SignInView from '@/views/SignInView'
import DashBoardView from '@/views/DashBoardView'
import NotFoundView from '@/views/NotFoundView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DashBoardView',
      component: DashBoardView
    }, {
      path: '/sign-in',
      name: 'SignInView',
      component: SignInView
    }, {
      path: '/sign-up',
      name: 'SignUpView',
      component: SignUpView
    }, {
      path: '/*',
      name: 'NotFoundView',
      component: NotFoundView
    }
  ]
})
