<script setup lang="ts">
import type { ModelRef } from 'vue';
import PlannerScrollableSelector from './common/PlannerScrollableSelector.vue';

const yearRef = defineModel<number>({ default: 0 }) as ModelRef<number>;

defineProps<{
  years: number[]
  currentYear: number
}>()
</script>

<template>
  <PlannerScrollableSelector
    v-model="yearRef"
    color-theme="amber"
    btn-size="px-3 py-2"
    :label="$t('label.year')"
    :items="years"
    :current-index="currentYear"
  />
</template>
