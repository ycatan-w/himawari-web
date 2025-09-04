<script setup lang="ts">
import { useFeatureColorTheme } from '@/utils/colorTheme';

defineProps<{ onClick: () => void }>();
const { featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <button
    @click="onClick"
    :class="['px-4 py-2 mx-3 cursor-pointer', featureColorTheme.button_zoom]"
  >
    <slot />
  </button>
</template>
