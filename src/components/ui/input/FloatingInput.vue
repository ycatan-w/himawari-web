<script setup lang="ts">
import { useAttrs } from 'vue';

const modelValue = defineModel();
defineProps<{
  id: string
  label: string
  type?: string
  divClass?: string
  inputClass?: string
  inputErrorClass?: string
  labelClass?: string
  labelErrorClass?: string
  error?: boolean | null
  errorMsg?: string
}>()
const attrs = useAttrs()
</script>

<template>
  <div class="relative  z-0">
    <input
      v-model="modelValue"
      :id="id"
      :type="type"
      :aria-describedby="`${id}_text`"
      placeholder=" "
      v-bind="attrs"
      :class="[
        inputClass,
        error ?? inputErrorClass
      ]"
    />
    <label
      :for="id"
      :class="[
        labelClass,
        error ?? labelErrorClass
      ]"
    >
      {{ label }}
    </label>
  </div>
  <p v-if="error && errorMsg" class="mt-2 text-xs text-white/80">{{ errorMsg }}</p>
</template>
