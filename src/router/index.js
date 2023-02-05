import { createRouter, createWebHistory } from 'vue-router';

// Components
import HomePage from '@/pages/HomePage.vue';
import TodoPage from '@/pages/TodoPage.vue';
import TheLogin from '@/pages/TheLogin.vue';
import TheSignup from '@/pages/TheSignup.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

// Store
import store from '@/store';

import { pageTitle } from '@/constants';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { auth: true, dontChangeTitle: true },
    },
    {
      path: '/todos/:id',
      props: true,
      component: TodoPage,
      meta: { auth: true, dontChangeTitle: true },
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
    {
      path: '/:notFound(.*)',
      name: 'notFound',
      component: NotFoundPage,
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

  if (!to.meta.dontChangeTitle) {
    document.title = pageTitle;
  }

  next();
});

export default router;
