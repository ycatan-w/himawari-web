<script setup lang="ts">
import { ButtonForm } from '@/components/ui/input';

const { colorScheme } = defineProps<{
colorScheme?: string
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
