<script lang="ts" setup>
import { useAttrs } from 'vue';
import { FloatingInput } from '@/components/ui/input';
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';

const modelValue = defineModel();
const { colorScheme } = defineProps<{
  colorScheme: Theme
  id: string
  label: string
  error?: boolean
  type?: string
  errorMsg?: string
}>();
const attrs = useAttrs();
const formColor = useCommonColorTheme(colorScheme, 'form');
</script>

<template>
  <FloatingInput
      v-model="modelValue"
      :id="id"
      :type="type || 'text'"
      :label="label"
      :input-class="[
        'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer',
        formColor.input_filled
      ]"
      input-error-class="text-white/80 border-white/80 focus:border-white/80"
      :label-class="[
        'absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
       formColor.label_filled
      ]"
      label-error-class="text-white/80 peer-focus:text-white/80"
      :error="error"
      :errorMsg="errorMsg"
      v-bind="attrs"
    />
</template>
