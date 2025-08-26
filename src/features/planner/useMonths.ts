import { ref, toValue, watch, watchEffect, type Ref } from "vue";

export function useMonths(yearRef: Ref<number>) {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentMonthRef = ref();
  const monthRef = ref(currentMonth);
  watchEffect(() => {
    currentMonthRef.value = toValue(yearRef) !== currentYear ? 0 : currentMonth;
  })

  return { monthRef, currentMonthRef, months };
}
