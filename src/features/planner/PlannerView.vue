<script setup lang="ts">
import { computed } from 'vue'
import { DailyOverviewView } from '@/features/daily-overview';
import YearGrid from './YearGrid.vue';
import MonthGrid from './MonthGrid.vue';
import DayGrid from './DayGrid.vue';
import { usePlanner } from './usePlanner';
import { useYears } from './useYears';
import { useMonths } from './useMonths';
import { useDays } from './useDays';

const { showOverview } = usePlanner();
const { yearRef, currentYear, years } = useYears(20);
const { monthRef, currentMonth, months } = useMonths();
const { dayRef, currentDay, daysInMonth } = useDays(yearRef, monthRef);
const selectedDate = computed(() => new Date(yearRef.value, monthRef.value, dayRef.value));
</script>

<template>
  <div class="h-full w-full flex flex-col text-white">
    <YearGrid v-model="yearRef" :current-year="currentYear" :years="years" />
    <MonthGrid v-model="monthRef" :current-month="currentMonth" :months="months" />
    <DayGrid v-model:day-ref="dayRef" v-model:show-overview="showOverview" :current-day="currentDay" :days-in-month="daysInMonth" />
  </div>

  <DailyOverviewView
    :date="selectedDate"
    :is-shown="showOverview"
    :close="() => showOverview = false"
  />
</template>
