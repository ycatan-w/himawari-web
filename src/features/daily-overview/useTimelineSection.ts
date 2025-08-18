import { onMounted, ref } from "vue";
import { getProvider } from '@/modules/providers';
import type { EventData } from "@/modules/providers/base-provider";

export function useTimelineSection(dateStr: string) {
  const newEventStartRef = ref<number | null>(null)
  const selectedEventIdRef = ref<number>(0);
  const rawEventsRef = ref<EventData[]>([]);
  const scaleFactorRef = ref(1);
  const provider = getProvider();

  const zoomInAction = () => {
    scaleFactorRef.value = Math.min(scaleFactorRef.value + 0.25, 24);
  }
  const zoomOutAction = () => {
    scaleFactorRef.value = Math.max(scaleFactorRef.value - 0.25, 1);
  }

  onMounted(async () => {
    rawEventsRef.value = await provider.getEvents(dateStr);
  });

  return { selectedEventIdRef, newEventStartRef, scaleFactorRef, rawEventsRef, zoomInAction, zoomOutAction }
}
