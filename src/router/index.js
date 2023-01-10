import { createRouter, createWebHistory } from 'vue-router';

// Components
import HomePage from '@/pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
  ],
});

export default router;
