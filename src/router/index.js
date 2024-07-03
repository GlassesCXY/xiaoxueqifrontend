import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
      redirect: "/home/monitor",
      children: [
        {
          path:"/home/monitor",
          name:"index",
          component:()=>import("../views/Index.vue")
        },
        {
          path:"/home/face/manage",
          name:"faceManage",
          component:()=> import("../views/FaceManage.vue")
        },
        {
          path:"/home/emotion/records",
          name:"emotionRecords",
          component:()=>import("../views/EmotionRecord.vue")
        }
      ],
    },
  ]
})

export default router
