import { ref, watch, type Ref } from "vue";
import { getRandomTheme, type Theme } from "@/utils/colorTheme";

export function useDailyOverview(isShown: Ref<boolean>) {
  const modes  = ['agenda', 'journal'] as const;
  const modeRef = ref<'agenda' | 'journal'>('agenda');
  const themeColorsRef = ref<Theme>('amber');

  watch(isShown, (isShown) => {
    if (isShown) {
      modeRef.value = 'agenda';
      themeColorsRef.value = getRandomTheme();
    }
  });

  return { modeRef, themeColorsRef, modes }
}
