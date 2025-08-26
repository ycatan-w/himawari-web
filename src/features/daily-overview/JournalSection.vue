<script setup lang="ts">
import { provide } from 'vue';
import JournalLog from '../journal/JournalLog.vue';
import JournalForm from '../journal/JournalForm.vue';
import { useJournalSection } from './useJournalSection';

const props = defineProps<{
  date: Date
  themeColors: string
}>();
provide("journalContext", {
  date: props.date,
  themeColors: props.themeColors,
});

const dateStr = props.date.toISOString().split('T')[0];
const { journalEntriesRef, newEntryRef, entryToEditRef } = useJournalSection(dateStr);

</script>

<template>
   <div class="flex flex-col h-full">
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
