import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component:() => import('./views/callback.vue')
  },
  {
    path: '/login',
    name: 'user-login',
    component:() => import('./views/user/login.vue'),
  },
  {
    path: '/host',
    name: 'room-host',
    component:() => import('./views/room/host.vue')
  },
  {
    path: '/room/:code', 
    name: 'room-client',
    component:() => import('./views/room/client.vue'),
    props: true
  },
  {
    path: '/add',
    name: 'user-add',
    component:() => import('./views/user/add.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router