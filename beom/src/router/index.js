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

  if(requiresAuth && !currentUser) {
    next('sign-in');
  }else if(!requiresAuth && currentUser) {
    next('dashboard');
  }else {
    next();
  }
});

export default router;