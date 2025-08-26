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
  <div class="bg-indigo-950 flex h-full">
    <div class="w-[80px] text-center font-semibold pt-2 text-indigo-400">{{ $t('label.days') }}</div>
    <div :class="`grid grid-cols-7 grid-rows-${rowDaysRef} flex-1 h-full`">
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
          'text-indigo-700 rounded-2xl hover:text-white hover:bg-indigo-700',
          dayRef === day && 'text-white bg-indigo-700',
        ]"
      >
        <span
          :class="[
             currentDay === day && 'underline underline-offset-4'
          ]"
        >
          {{ day }}
        </span>
      </div>
    </div>
  </div>
</template>
