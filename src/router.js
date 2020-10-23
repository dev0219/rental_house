import Vue from 'vue';
import Router from 'vue-router';
import Signup from './views/SignUp/Signup';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
import ProfileEdit from './views/ProfileEdit/ProfileEdit';
import Portfolio from './views/Portfolio/Portfolio';
import Property from './views/Property/Property';
import SelectProperty from './views/SelectProperty/SelectProperty';

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/sign-up',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/property/:id',
      name: 'Property',
      component: Property
    },
    {
      path: '/select-property',
      name: 'Select Property',
      component: SelectProperty
    },
    {
      path: '**',
      redirect: '/'
    },
  ]
})
export default router