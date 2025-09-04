<script setup lang="ts">
import { provide } from 'vue';
import { useJournalSection } from '../composables/useJournalSection';
import JournalFeed from '../components/JournalFeed.vue';
import JournalForm from '../components/JournalForm.vue';

const props = defineProps<{
  date: string;
}>();
provide('journalContext', {
  date: props.date,
});

// const dateStr = props.date.toISOString().split('T')[0];
const { journalEntriesRef, newEntryRef, entryToEditRef } = useJournalSection(props.date);
</script>

<template>
  <div class="mb-3">
    <h2 class="flex items-center text-xl font-semibold border-l-4 pl-2">
      <span class="flex-1">{{ $t('journal.feed.title') }}</span>
    </h2>
  </div>

  <div class="flex flex-col">
    <JournalFeed
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
