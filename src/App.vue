<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import { useFeatureColorTheme } from './utils/colorTheme';

const route = useRoute();
const currentBodyClass = computed(() => {
  if (route.meta.feature) {
    const { featureColorTheme } = useFeatureColorTheme(route.meta.feature as string);

    return featureColorTheme.body;
  }

  return route.meta.bodyClass;
});

watch(
  currentBodyClass,
  (newClass: any, oldClass: any) => {
    if (!newClass && !oldClass) {
      return ;
    }
    document.body.classList.remove(oldClass);
    document.body.classList.add(newClass);
  },
  { immediate: true }
);
</script>

<template>
  <LanguageSwitcher />
  <router-view />
</template>
