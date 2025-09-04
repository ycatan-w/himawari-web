import { reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/modules/auth";


export function useRegister() {
  const form = reactive({ username: '', password: '', passwordConfirm: '' });
  const errors = reactive({ username: false, password: false });
  const router = useRouter();

  const registerAction = async () => {
    errors.password = form.passwordConfirm !== form.password;
    if (errors.password) {
      return;
    }
    try {
      await register(form.username, form.password);
      router.push('/')
    } catch (e) {
      errors.username = true;
    }
  }

  return { form, errors, registerAction };
}
