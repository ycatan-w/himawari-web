<script lang="ts" setup>
import { useAttrs } from 'vue';
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';
import FloatingInput from './FloatingInput.vue';

const modelValue = defineModel<string>({ default: '' });
const { colorScheme } = defineProps<{
  colorScheme: Theme;
  id: string;
  label: string;
  error?: boolean;
  type?: string;
  errorMsg?: string | string[];
}>();
const attrs = useAttrs();
const { input_standard, label_standard } = useCommonColorTheme(colorScheme, 'form');
</script>

<template>
  <FloatingInput
    v-model="modelValue"
    :id="id"
    :type="type || 'text'"
    :label="label"
    :input-class="[
      'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer',
      input_standard,
    ]"
    input-error-class="fi-input-standard-error"
    :label-class="[
      'absolute text-xl duration-300 transform -translate-y-6 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
      label_standard,
    ]"
    label-error-class="fi-label-standard-error"
    :error="error"
    :errorMsg="errorMsg"
    v-bind="attrs"
  />
</template>
