<script setup lang="ts">
import { useEventSection } from '../composables/useEventSection';
import ZoomControls from '../components/ZoomControls.vue';
import EventTimeline from '../components/EventTimeline.vue';
import EventForm from '../components/EventForm.vue';

const props = defineProps<{ date: Date }>();
const dateStr = props.date.toISOString().split('T')[0];
const { selectedEventIdRef, newEventStartRef, scaleFactorRef, rawEventsRef } =
  useEventSection(dateStr);
</script>

<template>
  <div>
    <div class="mb-3">
      <h2 class="flex items-center text-xl font-semibold border-l-4 pl-2">
        <span class="flex-1">{{ $t('events.timeline.title') }}</span>
        <ZoomControls v-model="scaleFactorRef" />
      </h2>
    </div>

    <EventTimeline
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
