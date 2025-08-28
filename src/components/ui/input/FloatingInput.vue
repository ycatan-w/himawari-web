<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const modelValue = defineModel();
const { inputClass, labelClass } = defineProps<{
  id: string
  label: string
  type?: string
  divClass?: string
  inputClass?: string | string[] | Record<string, boolean>
  inputErrorClass?: string
  labelClass?: string | string[] | Record<string, boolean>
  labelErrorClass?: string
  error?: boolean | null
  errorMsg?: string
}>()
const attrs = useAttrs()
const computedInputClass = computed(() => {
  return [inputClass].flat();
});
const computedLabelClass = computed(() => {
  return [labelClass].flat();
});
</script>

<template>
  <div class="relative z-0">
    <input
      v-model="modelValue"
      :id="id"
      :type="type"
      :aria-describedby="`${id}_text`"
      placeholder=" "
      v-bind="attrs"
      :class="[
        computedInputClass,
        error && inputErrorClass
      ]"
    />
    <label
      :for="id"
      :class="[
        'cursor-text',
        computedLabelClass,
        error && labelErrorClass
      ]"
    >
      {{ label }}
    </label>
  </div>
  <p v-if="error && errorMsg" class="mt-2 text-sm text-white/80">{{ errorMsg }}</p>
</template>
