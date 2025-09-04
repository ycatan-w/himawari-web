<script setup lang="ts">
import { computed } from 'vue';
import { IconUp, IconDown } from '@/components/icons';

const props = defineProps<{
  modelValue: number;
  min?: number;
  max?: number;
}>();

const emit = defineEmits(['update:modelValue']);

const value = computed(() => props.modelValue);
const min = computed(() => props.min ?? 0);
const max = computed(() => props.max ?? 59);

function increase() {
  emit('update:modelValue', value.value < max.value ? value.value + 1 : min.value);
}

function decrease() {
  emit('update:modelValue', value.value > min.value ? value.value - 1 : max.value);
}
</script>

<template>
  <div class="flex flex-col items-center w-16 select-none">
    <button @click="increase" class="text-xl cursor-pointer" type="button"><IconUp /></button>
    <div class="my-2 text-lg font-bold">
      {{ value.toString().padStart(2, '0') }}
    </div>
    <button @click="decrease" class="text-xl cursor-pointer" type="button"><IconDown /></button>
  </div>
</template>
