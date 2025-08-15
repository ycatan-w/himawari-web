// import { en, fr } from '@/locales'
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
export type LangCode = 'en' | 'fr';

export interface LanguageOption {
  code: LangCode;
  label: string;
  icon: string;
}

export const LANG_KEY = 'app-lang';

export const availableLanguages: LanguageOption[] = [
  { code: 'en', label: 'English', icon: '🇬🇧' },
  { code: 'fr', label: 'Français', icon: '🇫🇷' }
];

export const messages = { en, fr };

export const defaultLanguage: LangCode =
  navigator.language.startsWith('fr') ? 'fr' : 'en';

export function saveLanguage(lang: LangCode) {
  localStorage.setItem(LANG_KEY, lang);
}

export function getSavedLanguage(): LangCode {
  return (localStorage.getItem(LANG_KEY) as LangCode) || defaultLanguage;
}
