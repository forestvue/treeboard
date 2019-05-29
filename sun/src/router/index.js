import Vue from 'vue'
import Router from 'vue-router'
import Home from "../views/Home"
import Login from "../views/Login"
import Signup from "../views/Signup"
import Dashboard from "../views/Dashboard"
import NotFound from "../views/404"
import Admin from "../views/Admin"
import User from "../views/User"

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      
      children: [
        {
          path: 'admin',
          component: Admin
        },
        {
          path: 'user',
          component: User
        }

      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});

export default router;

