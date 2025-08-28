import { IconCalendar, IconJournal } from "@/components/ui/icons";
import { useFeatureColorTheme } from "@/utils/colorTheme";
import { ref, toValue, watchEffect, type Ref } from "vue";

export function useDailyOverview(isShown: Ref<boolean>) {
const modes: {
  name: 'agenda' | 'journal',
  icon: typeof IconCalendar | typeof IconJournal
}[] = [
  {
    name: 'agenda',
    icon: IconCalendar,
  },
  {
    name: 'journal',
    icon: IconJournal,
  }
];
  const modeRef = ref<'agenda' | 'journal'>('agenda');
  const featureColorTheme = ref<any>({});

  watchEffect(() => {
    if (toValue(isShown)) {
      modeRef.value = 'agenda';
      const featureColor = useFeatureColorTheme('overview', true);
      featureColorTheme.value = featureColor.featureColorTheme;
    }
  });

  return { modeRef, featureColorTheme, modes }
}
