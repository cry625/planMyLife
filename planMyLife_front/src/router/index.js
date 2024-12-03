import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/home',//将三种分类、四种象限放在同一个页面中
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/carouselHome',
      name: '/carouselHome',//将三种分类放入三个el-carousel-item中，每个el-carousel-item中包含一个分类的四个象限
      component: () => import('../views/CarouselHome.vue'),
    },
  ],
})

export default router
