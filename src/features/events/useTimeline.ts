import type { EventData } from "@/modules/providers/base-provider";
import { computed, onMounted, ref, toValue, type ModelRef, type Ref } from "vue";

export function useTimeline(selectedEventId: ModelRef<number>, rawEventsRef: Ref<EventData[]>, ghostStart: Ref<number | null>) {
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
  };

  const computedGhostPosition = computed<number>(() => {
    if (ghostStart.value == null) {
      return 0;
    }
    const ghost = {
      id: -1,
      title: 'New event',
      start: ghostStart.value,
      end: ghostStart.value + 30,
    };
    const rows: number[] = [];
    const all: {
      id: number
      title: string
      start: number
      end: number
      duration?: number
      row?: number
    }[] = [...toValue(rawEventsRef), ghost].sort((a, b) => a.start - b.start);

    for (const e of all) {
      const duration = e.end - e.start;
      let row = 0;
      while (rows[row] && rows[row] > e.start) {
        row++;
      }
      rows[row] = e.end;
      e.row = row;
      e.duration = duration;
    }
    const ghostEvent = all.find(e => e.id === -1) ?? null;

    return ghostEvent?.row ?? 0;
  });

  const handleTimelineClickAction = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const totalMinutes = 24 * 60
    const clickedMinutes = Math.round((clickX / rect.width) * totalMinutes)

    ghostStart.value = clickedMinutes;
    selectedEventId.value = 0;
  }

  onMounted(async () => {
    if (timelineRef.value) {
      timelineWidth.value = timelineRef.value.clientWidth;
    }
  });

  return { computedPositionedEvents, computedGhostPosition, selectEventAction, handleTimelineClickAction };
}