import { createRouter, createWebHistory } from 'vue-router'
import { getRandomTheme } from '@/utils/colorTheme';
import { isAuthenticated } from './modules/auth';
import { LoginView, RegisterView } from '@/features/auth';
import { DashboardView } from '@/features/dashboard';

const routes = [
  {
    name: 'home',
    path: '/',
    component: DashboardView,
    meta: {
      requiresAuth: true,
      bodyClass: 'bg-gray-800'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: LoginView,
    meta: {
      guestOnly: true,
      theme: () => getRandomTheme(),
      themeValue: ''
    }
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterView,
    meta: {
      guestOnly: true,
      theme: () => getRandomTheme(),
      themeValue: ''
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.MODE !== '' ? 'production': '/'),
  routes,
});

router.beforeEach((to, from) => {
  const loggedIn = isAuthenticated();

  if (to.meta.requiresAuth && !loggedIn) {
    return { name: 'login' };
  }
  if (to.meta.guestOnly && loggedIn) {
    return { name: 'home' };
  }
});

export default router;
