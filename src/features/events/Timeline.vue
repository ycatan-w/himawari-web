<script setup lang="ts">
import type { EventData } from '@/modules/providers/base-provider';
import { computed, onMounted, ref, toRef } from 'vue';
import { useTimeline } from './useTimeline';

const selectedEventId = defineModel<number>({default: 0});
const props = defineProps<{
  themeColors: string,
  rawEventsRef: EventData[]
  scaleFactor: number
}>();
const { computedPositionedEvents, selectEventAction, minutesToTimeFormatter } = useTimeline(selectedEventId, toRef(props, 'rawEventsRef'));
</script>

<template>
  <div ref="timelineRef" :class="['at-timeline', `at-timeline-${themeColors}`]">
      <div class="relative" :style="{ width: `${100 * scaleFactor}%` }">
        <div :class="`relative w-full text-white text-xs md:text-sm flex items-end`">
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
        <div :class="['at-timeline-size', `at-timeline-size-${themeColors}`]">
          <div
            v-for="tick in 24"
            :key="tick"
            class="w-[calc(100%/24)] border-r border-white last:border-r-0"
          ></div>
        </div>
        <div class="relative h-32">
          <div
            v-for="(e, index) in computedPositionedEvents"
            :key="index"
            @click="selectEventAction(e)"
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
