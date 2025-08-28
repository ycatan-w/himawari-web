<script setup lang="ts">
import { IconZoomIn, IconZoomOut } from '@/components/ui/icons';
import { EventForm, Timeline } from '@/features/events';
import { useTimelineSection } from './useTimelineSection';
import { useFeatureColorTheme } from '@/utils/colorTheme';
import ZoomButton from './ZoomButton.vue';

const props = defineProps<{ date: Date }>();
const dateStr = props.date.toISOString().split('T')[0];
const { selectedEventIdRef, newEventStartRef, scaleFactorRef, rawEventsRef } = useTimelineSection(dateStr);
const { featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <div>
    <div class="mb-3">
      <h2 class="flex items-center text-xl font-semibold border-l-4 pl-2">
        <span class="flex-1">{{ $t('label.hours') }}</span>
        <!-- <span>{{ scaleFactorRef*100 }}%</span> -->
        <ZoomButton v-model="scaleFactorRef" />
      </h2>
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
