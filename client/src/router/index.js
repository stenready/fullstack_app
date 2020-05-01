import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register'
import Posts from '../views/Posts'
import Post from '../views/Post'
import NewPost from '../views/NewPost'
import Logaut from '../components/Logaut'
import NotFound from '../components/NotFound'

Vue.use(VueRouter)

const routes=[
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    meta: { super: true }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post,
    meta: { super: true }
  },
  {
    path: '/create-post',
    name: 'NewPost',
    component: NewPost,
    meta: { super: true }
  },
  {
    path: '/logaut',
    name: 'Logaut',
    component: Logaut,
    meta: { super: true }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router=new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.super)&&  !store.state.auth.auth_triger) {
    next({ name: 'Login' })
  }
  next()

})

export default router
