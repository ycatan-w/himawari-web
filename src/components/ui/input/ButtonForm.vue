<script setup lang="ts">
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';
import { useAttrs } from 'vue';

const { colorScheme } = defineProps<{
type?: "button" | "submit" | "reset" | undefined
colorScheme: Theme
label: string
}>();

const attrs = useAttrs();
const { button } = useCommonColorTheme(colorScheme, 'form');
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      'w-full cursor-pointer text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center',
      button
    ]"
    v-bind="attrs"
  >
    {{ label }}
  </button>
</template>
