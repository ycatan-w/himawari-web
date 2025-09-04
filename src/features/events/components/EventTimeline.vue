<script setup lang="ts">
import { toRef } from 'vue';
import { useFeatureColorTheme } from '@/utils/colorTheme';
import { minutesToTime } from '@/utils/timeHelper';
import type { EventData } from '@/modules/providers/base-provider';
import { useEventTimeline } from '../composables/useEventTimeline';

const selectedEventId = defineModel<number>('selectedEventId', { default: 0 });
const ghostStart = defineModel<number | null>('ghostStart', { default: null });
const props = defineProps<{
  rawEventsRef: EventData[];
  scaleFactor: number;
}>();
const {
  computedPositionedEvents,
  computedGhostPosition,
  selectEventAction,
  handleTimelineClickAction,
} = useEventTimeline(selectedEventId, toRef(props, 'rawEventsRef'), ghostStart);
const { featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <div
    ref="timelineRef"
    :class="[
      'overflow-x-auto w-full border shadow-2xl rounded h-70',
      featureColorTheme.timeline_body,
    ]"
  >
    <div class="flex flex-col h-full">
      <div class="relative" :style="{ width: `${100 * scaleFactor}%` }">
        <div
          class="relative w-full flex items-end text-xs md:text-sm"
          @click="handleTimelineClickAction"
        >
          <div v-for="hour in 24" :key="hour" class="w-[calc(100%/24)] relative text-center">
            <div
              :class="[
                'absolute transform -translate-x-1/2 top-2.5',
                featureColorTheme.timeline_slot,
                hour === 1 && 'hidden',
              ]"
            >
              {{ hour - 1 }}:00
            </div>
          </div>
        </div>
        <div
          :class="['flex w-full h-10', featureColorTheme.timeline_slot]"
          @click="handleTimelineClickAction"
        >
          <div
            v-for="tick in 24"
            :key="tick"
            class="w-[calc(100%/24)] border-r last:border-r-0"
          ></div>
        </div>
      </div>
      <div
        :class="['flex-1 overflow-y-auto relative', featureColorTheme.timeline_events]"
        :style="{ width: `${100 * scaleFactor}%` }"
        @click="handleTimelineClickAction"
      >
        <div
          v-if="ghostStart !== null"
          class="absolute h-[40px] bg-white/20 border rounded border-dashed border-white"
          :style="{
            left: `${(ghostStart / 1440) * 100}%`,
            width: `${(30 / 1440) * 100}%`,
            top: `${computedGhostPosition * 42}px`,
          }"
        ></div>
        <div
          v-for="(e, index) in computedPositionedEvents"
          :key="index"
          @click.stop="selectEventAction(e)"
          :class="[
            'absolute text-white/80 text-sm rounded px-2 py-1 overflow-hidden whitespace-nowrap cursor-pointer h-[40px]',
            selectedEventId === e.id
              ? featureColorTheme.timeline_event_selected
              : featureColorTheme.timeline_event,
          ]"
          :style="{
            left: `${(e.start / 1440) * 100}%`,
            width: `${((e.duration - 1) / 1440) * 100}%`,
            top: `${e.row * 42}px`,
          }"
        >
          <div :class="selectedEventId === e.id && 'font-semibold'">
            {{ e.title }}
          </div>
          <div :class="['text-xs text-white/70', selectedEventId === e.id && 'italic']">
            {{ minutesToTime(e.start) }} - {{ minutesToTime(e.end) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
