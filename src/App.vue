<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const route = useRoute();
const currentBodyClass = computed(() => {
  if (typeof route.meta.theme === 'function') {
    route.meta.themeValue = route.meta.theme();

    return `body-${route.meta.themeValue}`;
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
