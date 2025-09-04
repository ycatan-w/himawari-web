import { ref, toValue, watchEffect, type Ref } from 'vue';
import { MONTHS } from '@/utils/calendars';

export function useMonths(yearRef: Ref<number>) {
  const months = [...MONTHS];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentMonthRef = ref();
  const monthRef = ref(currentMonth);
  watchEffect(() => {
    currentMonthRef.value = toValue(yearRef) !== currentYear ? 0 : currentMonth;
  });

  return { monthRef, currentMonthRef, months };
}
