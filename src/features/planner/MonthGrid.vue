<script setup lang="ts">
import type { ModelRef } from 'vue';
import PlannerScrollableSelector from './common/PlannerScrollableSelector.vue';

const monthRef = defineModel<number>({ default: 0 }) as ModelRef<number>;
defineProps<{
  months: string[]
  currentMonth: number
}>();
</script>

<template>
    <PlannerScrollableSelector
      v-model="monthRef"
      color-theme="lime"
      btn-size="px-15.5 py-3"
      key-as-value
      :label="$t('label.month')"
      :items="months"
      :current-index="currentMonth"
      :formatItem="(m: number|string, i: number) => $t(`label.${m}`)"
    />
</template>
