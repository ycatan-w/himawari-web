<script setup lang="ts">
import { toRef } from 'vue';
import { IconClose, IconFlower } from '@/components/icons';
import { EventSectionView } from '@/features/events';
import { JournalSectionView } from '@/features/journal';
import { useDayDetails } from '../composables/useDayDetails';
import ViewTypeContentTabs from '../components/ViewTypeContentTabs.vue';

const props = defineProps<{
  date: string;
  isShown: boolean;
  close: () => void;
}>();

const { modeRef, featureColorTheme } = useDayDetails(toRef(props, 'isShown'));
</script>

<template>
  <transition name="slide">
    <div
      v-if="isShown"
      :class="[
        'fixed overflow-auto right-0 top-0 h-full w-full shadow-lg z-50 p-6 flex flex-col',
        featureColorTheme.body,
        featureColorTheme.text,
      ]"
    >
      <h5
        class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold mb-4 inline-flex items-center capitalize"
      >
        <span class="mr-3"><IconFlower /></span> {{ $d(new Date(date), { dateStyle: 'full' }) }}
      </h5>
      <div class="fixed top-4.5 right-28 z-51 flex bg-black/30 rounded-full backdrop-blur-sm">
        <button
          @click="close()"
          :class="[
            `cursor-pointer text-xl w-9 h-9 flex items-center justify-center rounded-full transition`,
            featureColorTheme.button_round,
          ]"
        >
          <IconClose />
        </button>
      </div>

      <ViewTypeContentTabs v-model="modeRef" />
      <div class="flex-1 mt-3">
        <EventSectionView v-if="modeRef === 'agenda'" :date="date" />
        <JournalSectionView v-else :date="date" />
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
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
