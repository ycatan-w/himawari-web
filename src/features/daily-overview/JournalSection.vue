<script setup lang="ts">
import { provide } from 'vue';
import JournalLog from '../journal/JournalLog.vue';
import JournalForm from '../journal/JournalForm.vue';
import { useJournalSection } from './useJournalSection';
import type { Theme } from '@/utils/colorTheme';

const props = defineProps<{
  date: Date
}>();
provide("journalContext", {
  date: props.date,
});

const dateStr = props.date.toISOString().split('T')[0];
const { journalEntriesRef, newEntryRef, entryToEditRef } = useJournalSection(dateStr);
</script>

<template>
  <div class="mb-3">
      <h2 class="flex items-center text-xl font-semibold border-l-4 pl-2">
        <span class="flex-1">{{ $t('label.notes') }}</span>
      </h2>
    </div>

   <div class="flex flex-col">
    <JournalLog
      v-model:entry-to-edit="entryToEditRef"
      :entries="journalEntriesRef"
      :new-entry="newEntryRef"
    />
    <JournalForm
      v-model:new-entry="newEntryRef"
      v-model:entry-to-edit="entryToEditRef"
      :entries="journalEntriesRef"
    />
  </div>
</template>
