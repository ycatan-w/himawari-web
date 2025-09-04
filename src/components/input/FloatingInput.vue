<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const modelValue = defineModel<string>({ default: '' });
const { inputClass, labelClass, errorMsg } = defineProps<{
  id: string;
  label: string;
  type?: string;
  maxLength?: number;
  divClass?: string;
  inputClass?: string | string[] | Record<string, boolean>;
  inputErrorClass?: string;
  labelClass?: string | string[] | Record<string, boolean>;
  labelErrorClass?: string;
  error?: boolean | null;
  errorMsg?: string | string[];
}>();
const attrs = useAttrs();
const computedInputClass = computed(() => {
  return [inputClass].flat();
});
const computedLabelClass = computed(() => {
  return [labelClass].flat();
});
const computedErrorMsg = computed(() => {
  return [errorMsg].flat();
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
      :class="[computedInputClass, error && inputErrorClass]"
    />
    <label :for="id" :class="['cursor-text', computedLabelClass, error && labelErrorClass]">
      {{ label }}
      <span
        v-if="maxLength"
        :class="[`text-sm font-extrabold`, maxLength - modelValue.length < 0 && 'text-white/80']"
      >
        {{ maxLength - modelValue.length }} / {{ maxLength }}
      </span>
    </label>
    <p v-if="error && computedErrorMsg.length === 1" class="mt-2 text-sm text-white/80">
      {{ computedErrorMsg[0] }}
    </p>
    <div v-else-if="error && computedErrorMsg.length > 1" class="mt-2">
      <ul class="list-inside list-[circle]">
        <li v-for="(message, index) in computedErrorMsg" :key="index" class="text-xs text-white/80">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>
