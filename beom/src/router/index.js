import Vue from 'vue'
import Router from 'vue-router'
import WelcomeView from '@/views/WelcomeView'
import SignUpView from '@/views/SignUpView'
import SignInView from '@/views/SignInView'
import DashBoardView from '@/views/DashBoardView'
import NotFoundView from '@/views/NotFoundView'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'WelcomeView',
      component: WelcomeView
    },{
      path: '/dashboard',
      name: 'DashBoardView',
      component: DashBoardView,
      meta: {
        requiresAuth: true
      }
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

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) { // 인증요구가 필요한 곳에서 로그인 되어있지 않으면, 로그인 화면으로
    next('sign-in');
  }else if(!requiresAuth && currentUser) { // 로그인 되어 있으면, 대쉬보드로
    next('dashboard');
  }else {
    next();
  }
});

export default router;