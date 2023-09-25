import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: '/',
          name: 'sponsor',
          component: () => import('../views/Layout.vue')
        },
        {
          path: 'sponsor/:id',
          name: 'sponsor_show',
          component: () => import('../views/sponsor/Show.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/404.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})

export default router
