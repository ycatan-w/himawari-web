<script setup lang="ts">
import { IconZoomIn, IconZoomOut } from '@/components/ui/icons';
import { EventForm, Timeline } from '@/features/events';
import { useTimelineSection } from './useTimelineSection';

const props = defineProps<{ date: Date, themeColors: string }>();
const dateStr = props.date.toISOString().split('T')[0];
const { selectedEventIdRef, newEventStartRef, scaleFactorRef, rawEventsRef, zoomInAction, zoomOutAction } = useTimelineSection(dateStr);
</script>

<template>
  <div class="flex items-start">
    <div :class="['at-side', `at-side-${themeColors}`]">
      <div class="sticky top-0 z-20 py-1 flex flex-col items-center">
        <div class="font-semibold text-shadow-sm">{{ $t('label.hours') }}</div>
        <div class="flex gap-1 p-0 bg-black/30 w-19 rounded-full backdrop-blur-sm ml-0">
          <button @click="zoomInAction" :class="['at-btn-zoom', `at-btn-zoom-${themeColors}`]">
            <IconZoomIn />
          </button>
          <button @click="zoomOutAction" :class="['at-btn-zoom', `at-btn-zoom-${themeColors}`]">
            <IconZoomOut />
          </button>
        </div>
      </div>
    </div>

    <Timeline
      v-model:selected-event-id="selectedEventIdRef"
      :scale-factor="scaleFactorRef"
      :theme-colors="themeColors"
      :raw-events-ref="rawEventsRef"
      v-model:ghost-start="newEventStartRef"
    />
  </div>

  <EventForm
    v-model:selected-event-id="selectedEventIdRef"
    v-model:draft-start="newEventStartRef"
    :date="date"
    :raw-events="rawEventsRef"
    :theme-colors="themeColors"
  />
</template>
