import { useRouter } from 'vue-router'
import { logout } from '@/modules/auth';

export function useDashboard() {
  const logoutAction = () => {
    logout();
    useRouter().push('/login')
  };

  return { logoutAction };
}
