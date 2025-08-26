import { ref, toValue, watchEffect, type Ref } from "vue";

export function useDays(yearRef: Ref<number>, monthRef: Ref<number>) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const currentDayRef = ref(currentDay);
  const dayRef = ref(currentDay);
  const daysInMonth = ref(0);

  watchEffect(() => {
    daysInMonth.value = new Date(toValue(yearRef), toValue(monthRef) + 1, 0).getDate();
    currentDayRef.value = toValue(yearRef) === currentYear && toValue(monthRef) === currentMonth ? currentDay : 0;
  });

  return { dayRef, currentDayRef, daysInMonth };
}
