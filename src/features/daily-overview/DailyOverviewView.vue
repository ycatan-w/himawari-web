<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue';
import { IconClose, IconFlower } from '@/components/ui/icons';
import TimelineSection from './TimelineSection.vue';
import { useDailyOverview } from './useDailyOverview';
import JournalSection from './JournalSection.vue';
import { useFeatureColorTheme } from '@/utils/colorTheme';

const props = defineProps<{
  date: Date
  isShown: boolean
  close: () => void
}>();

const { modeRef, featureColorTheme, modes } = useDailyOverview(toRef(props, 'isShown'));
</script>

<template>
  <transition name="slide">
    <div v-if="isShown"
      :class="[
        'fixed overflow-auto right-0 top-0 h-full w-full shadow-lg z-50 p-6 flex flex-col',
        featureColorTheme.body,
        featureColorTheme.text
      ]"
    >
      <h5 class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-4 inline-flex items-center capitalize">
        <span class="mr-3"><IconFlower /></span> {{ $d(date, {dateStyle: 'full'}) }}
      </h5>
      <div class="fixed top-4.5 right-28 z-51 flex bg-black/30 rounded-full backdrop-blur-sm">
        <button
          @click="close()"
          :class="[
            `cursor-pointer text-xl w-9 h-9 flex items-center justify-center rounded-full transition`,
            featureColorTheme.button_round
          ]"
        >
          <IconClose />
        </button>
      </div>

      <div class="border-b">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li
              v-for="(mode, index) in modes"
              :key="index"
              @click="modeRef = mode.name"
              class="me-2"
            >
              <span
                :class="[
                  'inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group cursor-pointer',
                  modeRef === mode.name ? featureColorTheme.tab_selected : 'border-transparent hover:text-white/70 hover:border-white/70'
                ]"
              >
                <component :is="mode.icon" class="me-2" />
                {{ $t(mode.name) }}
              </span>
            </li>
          </ul>
      </div>
      <div class="flex-1 mt-3">
        <TimelineSection v-if="modeRef === 'agenda'" :date="date" />
        <JournalSection v-else :date="date" />
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
