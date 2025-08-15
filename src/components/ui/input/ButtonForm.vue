<script setup lang="ts">
import { useAttrs } from 'vue';
import { useRoute } from 'vue-router';

const { colorScheme } = defineProps<{
type?: "button" | "submit" | "reset" | undefined
colorScheme?: string
label: string
}>();

const attrs = useAttrs();
const route = useRoute();
const colorName = colorScheme || (route.meta.themeValue as string);
</script>

<template>
  <button
    :type="type || 'button'"
    :class="`btn-form btn-form-${colorName}`"
    v-bind="attrs"
  >
    {{ label }}
  </button>
</template>
