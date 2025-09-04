import { useFeatureColorTheme } from '@/utils/colorTheme';
import { ref, toValue, watchEffect, type Ref } from 'vue';

export function useDayDetails(isShown: Ref<boolean>) {
  const modeRef = ref<'agenda' | 'journal'>('agenda');
  const featureColorTheme = ref<any>({});

  watchEffect(() => {
    if (toValue(isShown)) {
      modeRef.value = 'agenda';
      featureColorTheme.value = useFeatureColorTheme('overview', true).featureColorTheme;
    }
  });

  return { modeRef, featureColorTheme };
}
