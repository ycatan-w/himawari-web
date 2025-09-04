<script setup lang="ts">
import { ScrollableSelector } from '@/components/common';
import type { ModelRef } from 'vue';

const yearRef = defineModel<number>({ default: 0 }) as ModelRef<number>;

defineProps<{
  years: number[];
  currentYear: number;
}>();
</script>

<template>
  <ScrollableSelector
    v-model="yearRef"
    color-theme="amber"
    btn-size="px-15.5 py-3"
    :label="$t('dateNavigator.year.title')"
    :items="years"
    :current-index="currentYear"
  />
</template>
