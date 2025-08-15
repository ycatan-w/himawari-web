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
      :input-class="`fi-input-standard fi-input-standard-${colorName} peer`"
      input-error-class="fi-input-standard-error"
      :label-class="`fi-label-standard fi-label-standard-${colorName}`"
      label-error-class="fi-label-standard-error"
      :error="error"
      :errorMsg="errorMsg"
      v-bind="attrs"
    />
</template>