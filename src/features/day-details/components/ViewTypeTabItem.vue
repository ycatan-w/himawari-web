<script setup lang="ts">
import { useFeatureColorTheme } from '@/utils/colorTheme';

defineProps<{
  onClick: () => void;
  isSelected: () => boolean;
}>();
const { featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <li @click="onClick" class="me-2">
    <span
      :class="[
        'inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group cursor-pointer',
        isSelected()
          ? featureColorTheme.tab_selected
          : 'border-transparent hover:text-white/70 hover:border-white/70',
      ]"
    >
      <slot />
    </span>
  </li>
</template>
