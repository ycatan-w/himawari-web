import { ref } from "vue";

export function useMonths() {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const currentMonth = new Date().getMonth();
  const monthRef = ref(currentMonth);

  return { monthRef,currentMonth, months };
}
