<script setup lang="ts">
import { IconZoomIn, IconZoomOut } from '@/components/ui/icons';
import { EventForm, Timeline } from '@/features/events';
import { useTimelineSection } from './useTimelineSection';

const props = defineProps<{ date: Date, themeColors: string }>();
const dateStr = props.date.toISOString().split('T')[0];
const { selectedEventIdRef, scaleFactorRef, rawEventsRef, zoomInAction, zoomOutAction } = useTimelineSection(dateStr);
// const addBtn = async (eventToAdd: NewEventData) => {
//   provider.addEvent(eventToAdd);

//   try {
//       await provider.addEvent(eventToAdd);
//     // showToast('Événement ajouté avec succès');
//   } catch (err) {
//     const e = err as ProviderError;
//     if (e.code === 'VALIDATION_ERROR') {
//       // validationErrors.value = e.details;
//     } else {
//       // showToast(e.message, 'error');
//     }
//   }

//   mode.value = 'create';
//   event.value = emptyEvent();
// }
// const editBtn = (eventToEdit: EventData) => {
//   const indexToEdit = rawEvents.value.findIndex((item) => item.id === eventToEdit.id);
//   rawEvents.value[indexToEdit] = { ...eventToEdit };
//   mode.value = 'create';
//   event.value = emptyEvent();
// }
// const cancelBtn = () => {
//   mode.value = 'create';
//   event.value = emptyEvent();
// }
// const deleteBtn = (eventToDelete: EventData) => {
//   provider.deleteEvent(eventToDelete.id!)
//   mode.value = 'create';
//   event.value = emptyEvent();
// }
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
      v-model="selectedEventIdRef"
      :scale-factor="scaleFactorRef"
      :theme-colors="themeColors"
      :raw-events-ref="rawEventsRef"
    />
  </div>

  <EventForm
    v-model="selectedEventIdRef"
    :date="date"
    :raw-events="rawEventsRef"
    :theme-colors="themeColors"
  />

  <!-- <EventForm
    v-model="event"
    :date="date"
    :theme-colors="themeColors"
    :mode="mode"
    :add-btn="addBtn"
    :edit-btn="editBtn"
    :cancel-btn="cancelBtn"
    :delete-btn="deleteBtn"
  /> -->
</template>
