<script setup lang="ts">
import { toRef } from 'vue';
import { IconCalendar, IconClose } from '@/components/ui/icons';
import Journal from '@/features/journal/JournalForm.vue';
import TimelineSection from './TimelineSection.vue';
import { useDailyOverview } from './useDailyOverview';

const props = defineProps<{
  date: Date
  isShown: boolean
  close: () => void
}>();

const { modeRef, themeColorsRef, modes } = useDailyOverview(toRef(props, 'isShown'));
</script>

<template>
  <transition name="slide">
    <div v-if="isShown"
      class="fixed overflow-auto right-0 top-0 h-full w-full shadow-lg z-50 p-6 flex flex-col"
      :class="`ddp-main-${themeColorsRef}`"
    >
      <h5 class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-4 text-white inline-flex items-center capitalize">
        <span class="mr-3"><IconCalendar /></span> {{ $d(date, {dateStyle: 'full'}) }}
      </h5>
      <div class="fixed top-3 right-28 z-51 flex gap-2 p-1 bg-black/30 rounded-full backdrop-blur-sm">
        <button
          @click="close()"
          class="cursor-pointer text-xl w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-gray-700 text-gray-200"
        >
          <IconClose />
        </button>
      </div>

      <div class="relative">
        <div class="flex flex-col h-full w-full text-white 0 p-4 rounded relative" :class="`ddp-container-${themeColorsRef}`">
          <div class="flex justify-between items-center mb-4">
            <span></span>
            <div class="space-x-2">
              <button
                v-for="mode in modes"
                :key="mode"
                @click="modeRef = mode"
                :class="[
                  'px-3 py-1 rounded capitalize cursor-pointer',
                  `ddp-button-${themeColorsRef}`,
                  modeRef === mode && `ddp-button-selected-${themeColorsRef}`
                ]"
              >
                {{ $t(mode) }}
              </button>
            </div>
          </div>

          <div class="flex-1">
            <TimelineSection v-if="modeRef === 'agenda'" :date="date" :theme-colors="themeColorsRef" />
            <Journal v-else :date="date" :theme-colors="themeColorsRef" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>