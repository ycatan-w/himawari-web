<script setup lang="ts">
import type { EventData } from '@/modules/providers/base-provider';
import { toRef } from 'vue';
import { useTimeline } from './useTimeline';

const selectedEventId = defineModel<number>('selectedEventId', {default: 0});
const ghostStart = defineModel<number|null>('ghostStart', {default: null});
const props = defineProps<{
  themeColors: string,
  rawEventsRef: EventData[]
  scaleFactor: number
}>();
const { computedPositionedEvents, computedGhostPosition, selectEventAction, handleTimelineClickAction,  minutesToTimeFormatter } = useTimeline(selectedEventId, toRef(props, 'rawEventsRef'), ghostStart);
</script>

<template>
  <div ref="timelineRef" :class="['at-timeline', `at-timeline-${themeColors}`]">
      <div class="relative" :style="{ width: `${100 * scaleFactor}%` }">
        <div :class="`relative w-full text-white text-xs md:text-sm flex items-end`" @click="handleTimelineClickAction">
          <div
            v-for="hour in 24"
            :key="hour"
            class="w-[calc(100%/24)] relative text-center"
          >
            <div
              :class="[
                'at-timeline-label',
                `at-timeline-label-${themeColors}`,
                hour === 1 && 'hidden'
              ]"
            >
              {{ hour - 1 }}:00
            </div>
          </div>
        </div>
        <div :class="['at-timeline-size', `at-timeline-size-${themeColors}`]" @click="handleTimelineClickAction">
          <div
            v-for="tick in 24"
            :key="tick"
            class="w-[calc(100%/24)] border-r border-white last:border-r-0"
          ></div>
        </div>
        <div class="relative h-38 overflow-y-auto" @click="handleTimelineClickAction">
          <div
            v-if="ghostStart !== null"
            class="absolute h-[40px] bg-white/20 border rounded border-dashed border-white"
            :style="{
              left: `${(ghostStart / 1440) * 100}%`,
              width: `${(30 / 1440) * 100}%`,
              top: `${computedGhostPosition * 42}px`
            }"
          ></div>
          <div
            v-for="(e, index) in computedPositionedEvents"
            :key="index"
            @click.stop="selectEventAction(e)"
            :class="[
              'at-event h-[40px]',
              `at-event-${themeColors}`,
              selectedEventId === e.id && `at-event-selected-${themeColors}`
            ]"
            :style="{
              left: `${(e.start / 1440) * 100}%`,
              width: `${((e.duration - 1) / 1440) * 100}%`,
              top: `${e.row * 42}px`,
            }"
          >
            <div :class="
              selectedEventId === e.id && 'font-semibold'"
            >
              {{ e.title }}
            </div>
            <div :class="[
              'text-xs text-white/70',
            ]">
              {{ minutesToTimeFormatter(e.start) }} - {{ minutesToTimeFormatter(e.end) }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
