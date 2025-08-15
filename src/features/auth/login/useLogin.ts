import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { login } from '@/modules/auth';

export function useLogin() {
  const form = reactive({ username: '', password: '' });
  const error = ref(false);
  const router = useRouter();

  const loginAction = async () => {
    try {
      error.value = false;
      await login(form.username, form.password);
      router.push('/');
    } catch (e) {
      error.value = true;
    }
  };

  return { form, error, loginAction }
}
