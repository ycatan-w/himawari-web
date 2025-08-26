import { useFeatureColorTheme, type Theme } from "@/utils/colorTheme";
import { ref, toValue, watchEffect, type Ref } from "vue";

export function useDailyOverview(isShown: Ref<boolean>) {
  const modes  = ['agenda', 'journal'] as const;
  const modeRef = ref<'agenda' | 'journal'>('agenda');
  const featureColorThemeRef = ref<{colorPalette: Theme, featureColorTheme: any}>(
    {
      colorPalette: 'amber',
      featureColorTheme: {}
    }
  );


  watchEffect(() => {
    if (toValue(isShown)) {
      modeRef.value = 'agenda';
      featureColorThemeRef.value = useFeatureColorTheme('overview', true);
    }
  });

  return { modeRef, featureColorThemeRef, modes }
}
