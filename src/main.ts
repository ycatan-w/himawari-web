import '@/assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
import router from '@/router.ts'
import { initProvider } from '@/modules/providers'
import { defaultLanguage, getSavedLanguage, messages } from '@/modules/lang'
console.log(messages);

initProvider('local');
createApp(App)
  .use(
    createI18n({
        legacy: false,
        locale: getSavedLanguage(),
        fallbackLocale: defaultLanguage,
        messages: messages,
    })
  )
  .use(router)
  .mount('#app')
