import { useRouter } from 'vue-router'
import { logout } from '@/modules/auth';

export function useDashboard() {
  const router = useRouter();
  const logoutAction = () => {
    logout();
    router.push('/login')
  };

  return { logoutAction };
}
