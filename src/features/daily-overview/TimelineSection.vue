<script setup lang="ts">
import { IconZoomIn, IconZoomOut } from '@/components/ui/icons';
import { EventForm, Timeline } from '@/features/events';
import { useTimelineSection } from './useTimelineSection';
import { useFeatureColorTheme } from '@/utils/colorTheme';

const props = defineProps<{ date: Date, themeColors: string }>();
const dateStr = props.date.toISOString().split('T')[0];
const { selectedEventIdRef, newEventStartRef, scaleFactorRef, rawEventsRef, zoomInAction, zoomOutAction } = useTimelineSection(dateStr);
const { featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <div class="flex items-start">
    <div class="w-25 h-50 rounded-tl shrink-0 text-xs sm:text-sm md:text-lg">
      <div class="sticky top-0 z-20 py-1 flex flex-col items-center">
        <div class="font-semibold text-shadow-sm">{{ $t('label.hours') }}</div>
        <div class="flex gap-1 p-0 bg-black/30 w-19 rounded-full backdrop-blur-sm ml-0">
          <button
            @click="zoomInAction"
            :class="[
              'text-xl w-9 h-9 flex items-center justify-center rounded-full transition cursor-pointer',
              featureColorTheme.button_zoom
            ]"
          >
            <IconZoomIn />
          </button>
          <button
            @click="zoomOutAction"
            :class="[
              'text-xl w-9 h-9 flex items-center justify-center rounded-full transition cursor-pointer',
              featureColorTheme.button_zoom
            ]"
          >
            <IconZoomOut />
          </button>
        </div>
      </div>
    </div>

    <Timeline
      v-model:selected-event-id="selectedEventIdRef"
      :scale-factor="scaleFactorRef"
      :raw-events-ref="rawEventsRef"
      v-model:ghost-start="newEventStartRef"
    />
  </div>

  <EventForm
    v-model:selected-event-id="selectedEventIdRef"
    v-model:draft-start="newEventStartRef"
    :date="date"
    :raw-events="rawEventsRef"
  />
</template>
