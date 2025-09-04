import { nextTick, onMounted, ref, toValue, watch, type Ref } from 'vue';
import { renderedMarkdown } from '@/utils/helper';
import { getProvider } from '@/modules/providers';
import type { JournalData } from '@/modules/providers/base-provider';

export function useJournalFeed(journalEntries: Ref<JournalData[]>, newEntry: Ref<string>) {
  const entriesContainerRef = ref<HTMLElement | null>(null);
  const newEntryBubbleRef = ref('');
  const entryToDeleteRef = ref<number | null>(null);
  const provider = getProvider();
  const selectedJournal = ref<any>(null);

  const deleteAction = () => {
    if (!entryToDeleteRef.value) {
      return;
    }
    const entryIndex = journalEntries.value.findIndex(
      (entry) => entry.id === entryToDeleteRef.value,
    );
    if (entryIndex < 0) {
      return;
    }
    provider.deleteJournal(entryToDeleteRef.value);
    journalEntries.value.splice(entryIndex, 1);
    entryToDeleteRef.value = null;
  };

  const scrollToBottom = async () => {
    nextTick(() => {
      if (entriesContainerRef.value) {
        entriesContainerRef.value.scrollTo({
          top: entriesContainerRef.value.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  };
  onMounted(() => scrollToBottom());

  watch(journalEntries, () => scrollToBottom());
  watch(
    () => toValue(newEntry),
    async (data) => {
      newEntryBubbleRef.value = data ? await renderedMarkdown(data) : '';
      scrollToBottom();
    },
  );

  return {
    selectedJournal,
    newEntryBubbleRef,
    entriesContainerRef,
    entryToDeleteRef,
    deleteAction,
  };
}
