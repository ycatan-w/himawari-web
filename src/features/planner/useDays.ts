import { ref, toValue, watchEffect, type Ref } from "vue";

export function useDays(yearRef: Ref<number>, monthRef: Ref<number>) {
  const currentDay = new Date().getDate();
  const dayRef = ref(currentDay);
  const daysInMonth = ref(0);

  watchEffect(() => {
    daysInMonth.value = new Date(toValue(yearRef), toValue(monthRef) + 1, 0).getDate();
  });

  return { dayRef, currentDay, daysInMonth };
}
