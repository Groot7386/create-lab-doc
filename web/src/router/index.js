/*
 * @Author: fanjf
 * @Date: 2022-11-28 15:47:22
 * @LastEditTime: 2022-12-22 17:26:36
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\router\index.js
 * @Description: 🎉🎉🎉
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pInit',
      redirect: '/home',
      meta: {
        title: '表单文档'
      }
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: '表单文档'
      }
    },
    {
      path: '/manage',
      name: '管理页面',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/manage/manage.vue'),
      meta: {
        title: '后台管理页面'
      }
    },
    {
      path: '/access/error',
      name: 'notFound',
      component: () => import('@/views/noMatch/noMatch.vue'),
      meta: {
        title: '404'
      }
    },
    { path: '/:pathMatch(.*)*', redirect: '/access/error' }

  ]
})
// router.beforeEach

router.beforeEach((to, from, next) => {
  document.title = `📜生成${to.meta.title}`;
  next();
})

router.afterEach(()=>{
  document.getElementById('app').scrollTop = 0;
})
export default router
