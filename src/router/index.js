import { createRouter, createWebHistory } from 'vue-router';

// Components


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: null,
    },
  ],
});

export default router;
