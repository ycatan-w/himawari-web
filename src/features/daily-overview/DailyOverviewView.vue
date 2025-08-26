<script setup lang="ts">
import { toRef } from 'vue';
import { IconCalendar, IconClose } from '@/components/ui/icons';
import TimelineSection from './TimelineSection.vue';
import { useDailyOverview } from './useDailyOverview';
import JournalSection from './JournalSection.vue';

const props = defineProps<{
  date: Date
  isShown: boolean
  close: () => void
}>();

const { modeRef, featureColorThemeRef, modes } = useDailyOverview(toRef(props, 'isShown'));
</script>

<template>
  <transition name="slide">
    <div v-if="isShown"
      :class="[
        'fixed overflow-auto right-0 top-0 h-full w-full shadow-lg z-50 p-6 flex flex-col',
        featureColorThemeRef.featureColorTheme.body,
        featureColorThemeRef.featureColorTheme.text
      ]"
    >
      <h5 class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-4 inline-flex items-center capitalize">
        <span class="mr-3"><IconCalendar /></span> {{ $d(date, {dateStyle: 'full'}) }}
      </h5>
      <div class="fixed top-3 right-28 z-51 flex bg-black/30 rounded-full backdrop-blur-sm">
        <button
          @click="close()"
          :class="[
            `cursor-pointer text-xl w-9 h-9 flex items-center justify-center rounded-full transition`,
            featureColorThemeRef.featureColorTheme.button_zoom
          ]"
        >
          <IconClose />
        </button>
      </div>

      <div class="relative">
        <div
          :class="[
            'flex flex-col h-full w-full 0 p-4 relative rounded-lg shadow border',
            featureColorThemeRef.featureColorTheme.container,
          ]"
        >
          <div class="flex justify-between items-center mb-4">
            <span></span>
            <div class="space-x-2">
              <button
                v-for="mode in modes"
                :key="mode"
                @click="modeRef = mode"
                :class="[
                  'px-3 py-1 rounded capitalize cursor-pointer',
                  modeRef === mode ? featureColorThemeRef.featureColorTheme.button_selected : featureColorThemeRef.featureColorTheme.button
                ]"
              >
                {{ $t(mode) }}
              </button>
            </div>
          </div>

          <div class="flex-1">
            <TimelineSection v-if="modeRef === 'agenda'" :date="date" :theme-colors="featureColorThemeRef.colorPalette" />
            <JournalSection v-else :date="date" :theme-colors="featureColorThemeRef.colorPalette" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
