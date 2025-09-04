import type { APIError } from '@/modules/providers/api-provider';
import { useI18n } from 'vue-i18n';

export function useTranslator() {
  const { t } = useI18n();
  function translateErrorApi(endpoint: string, error: APIError) {
    const key = `api.${endpoint}.${error.field || 'root'}.${error.code}`.toLowerCase();
    return t(key);
  }

  return { translateErrorApi };
}
