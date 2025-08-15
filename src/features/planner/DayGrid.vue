<script setup lang="ts">
const dayRef = defineModel('dayRef');
const showOverview = defineModel('showOverview');

defineProps<{
  daysInMonth: number
  currentDay: number
}>();
</script>

<template>
  <div class="bg-indigo-500 flex ">
      <div class="w-[80px] text-center font-semibold pt-2">{{ $t('label.days') }}</div>
      <div class="grid gap-5 w-full h-full grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] p-4 overflow-y-scroll">
        <button
          v-for="day in daysInMonth"
          :key="day"
          @click="[
            dayRef =  day,
            showOverview = true
          ]"
          :class="[
            'aspect-square w-full flex items-center justify-center cursor-pointer',
            'bg-indigo-700 hover:bg-indigo-600',
            dayRef === day && 'ring-2 ring-indigo-400',
            currentDay === day && 'border border-red-800'
          ]"
        >
          {{ day }}
        </button>
      </div>
    </div>
</template>
