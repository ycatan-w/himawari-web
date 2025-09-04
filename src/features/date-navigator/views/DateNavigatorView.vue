<script setup lang="ts">
import { computed } from 'vue';
import { DayDetailsView } from '@/features/day-details';
import YearGrid from '../components/YearGrid.vue';
import MonthGrid from '../components/MonthGrid.vue';
import DayGrid from '../components/DayGrid.vue';
import { useDateNavigator } from '../composables/useDateNavigator';
import { useYears } from '../composables/useYears';
import { useMonths } from '../composables/useMonths';
import { useDays } from '../composables/useDays';

const { showOverview } = useDateNavigator();
const { yearRef, currentYear, years } = useYears(5);
const { monthRef, currentMonthRef, months } = useMonths(yearRef);
const { dayRef, currentDayRef, daysInMonth } = useDays(yearRef, monthRef);
// const selectedDate = computed(() => new Date(yearRef.value, monthRef.value, dayRef.value));
const selectedDate = computed(
  () =>
    `${yearRef.value}-${(monthRef.value + 1).toString().padStart(2, '0')}-${dayRef.value.toString().padStart(2, '0')}`,
);
</script>

<template>
  <div class="h-full w-full flex flex-col text-white">
    <YearGrid v-model="yearRef" :current-year="currentYear" :years="years" />
    <MonthGrid v-model="monthRef" :current-month="currentMonthRef" :months="months" />
    <DayGrid
      v-model:day-ref="dayRef"
      v-model:show-overview="showOverview"
      :current-day="currentDayRef"
      :days-in-month="daysInMonth"
    />
  </div>

  <DayDetailsView
    :date="selectedDate"
    :is-shown="showOverview"
    :close="() => (showOverview = false)"
  />
</template>
