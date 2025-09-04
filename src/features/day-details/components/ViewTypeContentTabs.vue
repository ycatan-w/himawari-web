<script setup lang="ts">
import { IconCalendar, IconJournal } from '@/components/icons';
import ViewTypeTabItem from './ViewTypeTabItem.vue';

const modeRef = defineModel<'agenda' | 'journal'>();
</script>

<template>
  <div class="border-b">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
      <ViewTypeTabItem
        :on-click="() => (modeRef = 'agenda')"
        :is-selected="() => modeRef === 'agenda'"
      >
        <IconCalendar class="me-2" /> {{ $t('dayDetails.viewTypeTab.agenda') }}
      </ViewTypeTabItem>
      <ViewTypeTabItem
        :on-click="() => (modeRef = 'journal')"
        :is-selected="() => modeRef === 'journal'"
      >
        <IconJournal class="me-2" /> {{ $t('dayDetails.viewTypeTab.journal') }}
      </ViewTypeTabItem>
    </ul>
  </div>
</template>
