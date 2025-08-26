import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { isAuthenticated } from './modules/auth';
import { LoginView, RegisterView } from '@/features/auth';
import { DashboardView } from '@/features/dashboard';
import { useFeatureColorTheme } from './utils/colorTheme';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: DashboardView,
    meta: {
      requiresAuth: true,
      bodyClass: 'bg-gray-900'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: LoginView,
    meta: {
      guestOnly: true,
      feature: 'auth'
    }
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterView,
    meta: {
      guestOnly: true,
      feature: 'auth',
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.MODE !== 'production' ? '/' : '/himawari-web/'),
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
  if (to.meta.feature) {
    useFeatureColorTheme(to.meta.feature as string, true);
  }
});

export default router;
