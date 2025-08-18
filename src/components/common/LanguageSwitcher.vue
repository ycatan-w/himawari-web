<script setup lang="ts">
import { useLanguage } from './useLanguage';

const { availableLanguages, switchLanguageAction } = useLanguage();

</script>

<template>
    <div
      class="fixed top-3 right-4 z-51 flex gap-2 p-1 bg-black/30 rounded-full backdrop-blur-sm"
    >
    <button
      v-for="lang in availableLanguages"
      :key="lang.code"
      @click="switchLanguageAction(lang.code)"
      :title="lang.label"
      :aria-label="lang.label"
      class="cursor-pointer text-xl w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-amber-700 text-amber-200"
    >
      {{ lang.icon }}
    </button>
  </div>
</template>
