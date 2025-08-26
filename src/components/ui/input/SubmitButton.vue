<script setup lang="ts">
import { ButtonForm } from '@/components/ui/input';
import type { Theme } from '@/utils/colorTheme';

const { colorScheme } = defineProps<{
colorScheme: Theme
label: string
}>();
</script>

<template>
  <ButtonForm
    type="submit"
    :label="label"
    :color-scheme="colorScheme"
  />
</template>
