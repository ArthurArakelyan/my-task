import { createRouter, createWebHistory } from 'vue-router';

// Components
import HomePage from '@/pages/HomePage.vue';
import TodoPage from '@/pages/TodoPage.vue';
import TheLogin from '@/pages/TheLogin.vue';
import TheSignup from '@/pages/TheSignup.vue';

// Store
import store from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { auth: true },
    },
    {
      path: '/todos/:id',
      props: true,
      component: TodoPage,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: TheLogin,
      meta: { auth: false },
    },
    {
      path: '/signup',
      name: 'signup',
      component: TheSignup,
      meta: { auth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters['auth/isAuth']) {
    return next('/login');
  }

  if (to.meta.auth === false && store.getters['auth/isAuth']) {
    return next('/');
  }

  next();
});

export default router;
