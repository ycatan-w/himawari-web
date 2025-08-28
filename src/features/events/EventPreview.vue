<script setup lang="ts">
import type { EventData } from '@/modules/providers/base-provider';
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';
import { minutesToTime } from '@/utils/timeHelper';

const props = defineProps<{
  event: EventData
  colorPalette: Theme
  hideDescription?: boolean
  titleSize?: string
}>();

const { background, dot } = useCommonColorTheme(props.colorPalette, 'event_preview');
</script>

<template>
  <div
    :class="[
      'p-3 rounded-md border border-white/10',
      background
    ]"
  >
    <div class="flex items-center gap-2">
      <span
        :class="[
          'w-2.5 h-2.5 rounded-full',
          dot
        ]"
      />
      <h3
        :class="[
          'font-semibold',
          titleSize || 'text-base'
        ]"
      >{{ event.title }}</h3>
      •
      <p class="mt-1 text-xs italic text-white/50">
        {{ minutesToTime(event.start) }} - {{ minutesToTime(event.end) }}
      </p>
    </div>

    <p v-if="!hideDescription" class="mt-2 text-sm line-clamp-2 text-white/60">
      {{ event.description }}
    </p>
  </div>
</template>
