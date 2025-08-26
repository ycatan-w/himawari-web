import { ref, toValue } from "vue";

function generateCenteredYearRange(center: number, range: number = 11): number[] {
  return Array.from({ length: (range * 2 + 1) }, (_, i) => center - range + i);
}

export function useYears(range: number = 20) {
  const currentYear = new Date().getFullYear();
  const yearRef = ref(currentYear);
  const years = generateCenteredYearRange(currentYear, toValue(range));

  return { yearRef, currentYear, years };
}
