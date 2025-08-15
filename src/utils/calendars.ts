export const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

export function generateCenteredYearRange(center: number, range: number = 11): number[] {
  return Array.from({ length: (range * 2 + 1) }, (_, i) => center - range + i);
}
