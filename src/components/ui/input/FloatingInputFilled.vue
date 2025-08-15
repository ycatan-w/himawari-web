<script lang="ts" setup>
import { useAttrs } from 'vue';
import { useRoute } from 'vue-router';
import { FloatingInput } from '@/components/ui/input';

const modelValue = defineModel();
const {colorScheme} = defineProps<{
  colorScheme?: string
  id: string
  label: string
  error?: boolean
  type?: string
  errorMsg?: string
}>();
const attrs = useAttrs();
const route = useRoute();
const colorName = colorScheme || (route.meta.themeValue as string);
</script>

<template>
  <FloatingInput
      v-model="modelValue"
      :id="id"
      :type="type || 'text'"
      :label="label"
      :input-class="`fi-input-filled fi-input-filled-${colorName} peer`"
      input-error-class="fi-input-filled-error"
      :label-class="`fi-label-filled fi-label-filled-${colorName}`"
      label-error-class="fi-label-filled-error"
      :error="error"
      :errorMsg="errorMsg"
      v-bind="attrs"
    />
</template>
