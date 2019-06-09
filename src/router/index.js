import Vue from 'vue'
import Router from 'vue-router'
import IntroView from '@/views/IntroView'
import SignUpView from '@/views/SignUpView'
import SignInView from '@/views/SignInView'
import DashBoardView from '@/views/DashBoardView'
import NotFoundView from '@/views/NotFoundView'
import ChartView from '@/views/ChartView'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'IntroView',
      component: IntroView
    },
    {
      path: '/dashboard',
      name: 'DashBoardView',
      component: DashBoardView,
      meta: {
        requiresAuth: true
      }
    }, 
    {
      path: '/Chart',
      name: 'ChartView',
      component: ChartView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-in',
      name: 'SignInView',
      component: SignInView
    }, 
    {
      path: '/sign-up',
      name: 'SignUpView',
      component: SignUpView
    }, 
    {
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