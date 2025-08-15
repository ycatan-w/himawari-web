import type { EventData } from "@/modules/providers/base-provider";
import { computed, onMounted, ref, toValue, type ModelRef, type Ref } from "vue";

export function useTimeline(selectedEventId: ModelRef<number>, rawEventsRef: Ref<EventData[]>) {
  const computedPositionedEvents = computed(() => {
    const rows: number[] = [];
    return [...toValue(rawEventsRef)]
    .sort((a, b) => a.start - b.start)
    .map(event => {
      const duration = event.end - event.start;
      let row = 0;
      while (rows[row] && rows[row] > event.start) {
        row++;
      }
      rows[row] = event.end;
      return {
        ...event,
        duration,
        row
      };
    });
  });
  const timelineRef = ref<HTMLElement | null>(null);
  const timelineWidth = ref(1440);
  const selectEventAction = (selectedEvent: EventData) => {
    selectedEventId.value = selectedEvent.id === toValue(selectedEventId) ? 0 : selectedEvent.id;
  }

  function minutesToTimeFormatter(minutes: number): string {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(h)}:${pad(m)}`
  }

  onMounted(async () => {
    if (timelineRef.value) {
      timelineWidth.value = timelineRef.value.clientWidth;
    }
  });

  return { computedPositionedEvents, selectEventAction, minutesToTimeFormatter };
}