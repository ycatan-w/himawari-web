<script setup lang="ts">
import { getProvider } from '@/modules/providers';
import type { EventData } from '@/modules/providers/base-provider';
import { computed, onMounted, ref } from 'vue';


const provider = getProvider();
const events = ref<EventData[]>([]);

const sortedEvents = computed(() => {
  let currentTime: number|null = null;
  return [...events.value]
  .sort((a, b) => a.start - b.start)
  .map(event => {
    const rounded = currentTime !== event.start;
    if (currentTime !== event.start) {
      currentTime = event.start;
    };
    return {...event, rounded};
  })
});

onMounted(() => {
  const dateStr = new Date().toISOString().split('T')[0];
  provider.getEvents(dateStr)
  .then(data => {
    events.value = data;
  });
});

function minutesToTimeFormatter(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}`
}
</script>

<template>
  <div class="relative flex flex-col h-full w-full overflow-y-auto">
    <h2 class="ml-10 text-xl font-semibold relative pl-2">Your Plan today</h2>
    <!-- Ligne temporelle -->
    <div class="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-400/80 via-amber-600/50 to-amber-400/80"></div>

    <!-- Prévisualisation -->
    <div
      v-for="(e, index) in sortedEvents"
      :key="index"
      class="ml-10 mb-2 mr-2 p-4 rounded-2xl bg-neutral-800/70 shadow-md backdrop-blur-sm relative"
    >
      <h3 class="text-sm font-semibold text-amber-300">
        {{ e.title }}
      </h3>
      <div class="text-xs text-white/70 max-w-none mt-2 italic">{{ minutesToTimeFormatter(e.start) }} - {{ minutesToTimeFormatter(e.end) }}</div>
      <span v-if="e.rounded" class="absolute left-[-1.2rem] top-6 w-3 h-3 rounded-full bg-amber-400 shadow-md"></span>
    </div>
  </div>
</template>
