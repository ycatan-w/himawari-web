<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { availableLanguages, saveLanguage, type LangCode } from '@/modules/lang'

const { locale } = useI18n()
function switchLanguage(lang: LangCode) {
  locale.value = lang;
  saveLanguage(lang);
}
</script>

<template>
    <div
      class="fixed top-3 right-4 z-51 flex gap-2 p-1 bg-black/30 rounded-full backdrop-blur-sm"
    >
    <button
      v-for="lang in availableLanguages"
      :key="lang.code"
      @click="switchLanguage(lang.code)"
      :title="lang.label"
      :aria-label="lang.label"
      class="cursor-pointer text-xl w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-amber-700 text-amber-200"
    >
      {{ lang.icon }}
    </button>
  </div>
</template>
