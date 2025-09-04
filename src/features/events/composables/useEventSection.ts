import { onMounted, ref } from 'vue';
import { getProvider } from '@/modules/providers';
import type { EventData } from '@/modules/providers/base-provider';

export function useEventSection(dateStr: string) {
  const newEventStartRef = ref<number | null>(null);
  const selectedEventIdRef = ref<number>(0);
  const rawEventsRef = ref<EventData[]>([]);
  const scaleFactorRef = ref(1);
  const provider = getProvider();

  onMounted(async () => {
    rawEventsRef.value = await provider.getEvents(dateStr);
  });

  return { selectedEventIdRef, newEventStartRef, scaleFactorRef, rawEventsRef };
}
