import { useI18n } from 'vue-i18n'
import { availableLanguages, saveLanguage, type LangCode } from '@/modules/lang'

export function useLanguage() {
  const { locale } = useI18n()
  function switchLanguageAction(lang: LangCode) {
    locale.value = lang;
    saveLanguage(lang);
  }

  return { availableLanguages, switchLanguageAction };
}
