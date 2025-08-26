<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const dayRef = defineModel('dayRef');
const showOverview = defineModel('showOverview');

const props = defineProps<{
  daysInMonth: number
  currentDay: number
}>();
const rowDaysRef = ref(5);
onMounted(() => {
  rowDaysRef.value = Math.ceil(props.daysInMonth/7);
});
watch(() => props.daysInMonth, () => {
  rowDaysRef.value = Math.ceil(props.daysInMonth/7);
});
</script>

<template>
  <div class="bg-indigo-500 flex h-full">
    <div class="w-[80px] text-center font-semibold pt-2">{{ $t('label.days') }}</div>
    <div :class="`grid grid-cols-7 grid-rows-${rowDaysRef} gap-5 p-4 min-h-[calc(100vh-225px)] w-full`">
      <div
        v-for="day in daysInMonth"
        :key="day"
        role="button"
        @click="[
          dayRef =  day,
          showOverview = true
        ]"
        :class="[
          'w-full h-full flex items-center justify-center cursor-pointer',
          'bg-indigo-700 hover:bg-indigo-600',
          dayRef === day && 'ring-2 ring-indigo-400',
          currentDay === day && 'border border-red-800'
        ]"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>
