<script setup lang="ts">
import { ScrollableSelector } from '@/components/common';
import type { ModelRef } from 'vue';

const monthRef = defineModel<number>({ default: 0 }) as ModelRef<number>;
defineProps<{
  months: string[];
  currentMonth: number;
}>();
</script>

<template>
  <ScrollableSelector
    v-model="monthRef"
    color-theme="lime"
    btn-size="px-15.5 py-3"
    key-as-value
    :label="$t('dateNavigator.month.title')"
    :items="months"
    :current-index="currentMonth"
    :formatItem="(m: number | string, i: number) => $t(`dateNavigator.month.label.${m}`)"
  />
</template>
