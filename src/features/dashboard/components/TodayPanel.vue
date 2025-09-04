<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useFeatureColorTheme, type Theme } from '@/utils/colorTheme';
import { getProvider } from '@/modules/providers';
import type { EventData, JournalData } from '@/modules/providers/base-provider';
import { EventPreview } from '@/features/events';
import { JournalPreview } from '@/features/journal';

const provider = getProvider();
const events = ref<EventData[]>([]);
const journals = ref<JournalData[] | null>([]);
const featureColorTheme = ref<any>({});
const colorPalette = ref<Theme>('amber');

const sortedEvents = computed(() => {
  let currentTime: number | null = null;
  return [...events.value]
    .sort((a, b) => a.start - b.start)
    .map((event) => {
      const rounded = currentTime !== event.start;
      if (currentTime !== event.start) {
        currentTime = event.start;
      }
      return { ...event, rounded };
    });
});

onMounted(() => {
  const dateStr = new Date().toISOString().split('T')[0];
  provider.getEvents(dateStr).then((data) => {
    events.value = data;
  });
  provider.getJournal(dateStr).then((data) => {
    journals.value = data;
  });
  const featureColor = useFeatureColorTheme('todayPanel', true);
  featureColorTheme.value = featureColor.featureColorTheme;
  colorPalette.value = featureColor.colorPalette;
});
</script>

<template>
  <div class="flex flex-col h-screen w-full p-4 gap-4">
    <h2 class="flex items-center text-xl font-semibold border-l-4 pl-2">
      <span class="flex-1 capitalize">{{ $d(new Date(), { dateStyle: 'full' }) }}</span>
    </h2>
    <h2 class="text-base font-semibold">{{ $t('dashboard.todayPanel.title.event') }}</h2>
    <div :class="['flex-1 overflow-y-auto border-l-2 pl-6', featureColorTheme.flux]">
      <div v-for="(e, index) in sortedEvents" :key="index" class="mb-6 relative">
        <span
          :class="[
            'absolute -left-5 top-2 w-3 h-3 rounded-full shadow-md',
            featureColorTheme.bullet,
          ]"
          v-if="e.rounded"
        ></span>

        <EventPreview
          :event="e"
          :color-palette="colorPalette"
          :hide-description="true"
          title-size="text-xs"
        />
      </div>
    </div>

    <h3 class="text-base font-semibold">{{ $t('dashboard.todayPanel.title.journal') }}</h3>
    <div class="flex-1 overflow-y-auto flex flex-col gap-3">
      <div v-for="(j, index) in journals" :key="index">
        <JournalPreview :journal="j" :color-palette="colorPalette" />
      </div>
    </div>
  </div>
</template>
