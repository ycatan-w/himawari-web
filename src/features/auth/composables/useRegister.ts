import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/modules/auth';
import { useI18n } from 'vue-i18n';
import { APIException } from '@/modules/providers/api-provider';
import { useTranslator } from '@/utils/translation';

export function useRegister() {
  const form = reactive({ username: '', password: '', passwordConfirm: '' });
  const router = useRouter();
  const { t } = useI18n();
  const { translateErrorApi } = useTranslator();
  const usernameErrors = ref<string[]>([]);
  const passwordErrors = ref<string[]>([]);

  const registerAction = async () => {
    usernameErrors.value = [];
    passwordErrors.value = [];
    if (form.passwordConfirm !== form.password) {
      passwordErrors.value.push(t('auth.register.error.passwordMismatch'));
    }

    if (usernameErrors.value.length > 0 || passwordErrors.value.length > 0) {
      return;
    }
    register(form.username, form.password)
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        if (err instanceof APIException) {
          err.errors.forEach((e) => {
            switch (e.field) {
              case 'username':
                usernameErrors.value.push(translateErrorApi('register', e));
                break;
              case 'password':
                passwordErrors.value.push(translateErrorApi('register', e));
                break;
            }
          });
        }
      });
  };

  return { form, usernameErrors, passwordErrors, registerAction };
}
