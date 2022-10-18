import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'room-index',
    component:() => import('./views/room/index.vue')
  },
  {
    path: '/callback',
    name: 'room-callback',
    component:() => import('./views/room/callback.vue')
  },
  {
    path: '/add',
    name: 'room-add',
    component:() => import('./views/room/add.vue')
  },
  {
    path: '/edit/:id',
    name: 'room-edit',
    component:() => import('./views/room/edit.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router