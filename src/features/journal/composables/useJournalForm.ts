import { nextTick, onMounted, ref, watch, type ModelRef, type Ref } from 'vue';
import { getProvider } from '@/modules/providers';
import type { JournalData } from '@/modules/providers/base-provider';

export function useJournalForm(
  newEntry: ModelRef<string>,
  entryToEdit: ModelRef<{ id: number | null; text: string }>,
  entries: Ref<JournalData[]>,
  date: Date,
) {
  const textareaElemRef = ref<HTMLTextAreaElement | null>(null);
  const textareaRef = ref<string>('');
  const maxHeight = 120; // Line height estimate (1.5rem = 24px), 5 lines = 120px
  const provider = getProvider();
  const onEnter = () => {
    const journalEntry = textareaRef.value.trim();
    if (!journalEntry) {
      return;
    }
    const entryToEditId = entryToEdit.value.id;
    onEscape();
    if (entryToEditId) {
      const entryIndex = entries.value.findIndex((e) => e.id === entryToEditId);
      if (entryIndex < 0) {
        return;
      }
      const entry = entries.value[entryIndex];
      entry.text = journalEntry;
      provider.updateJournal({ ...entry });
      return;
    }
    provider
      .addJournal({
        text: journalEntry,
        date: date.toISOString().split('T')[0],
      })
      .then((addedEntry) => {
        entries.value.push(addedEntry);
      });
  };
  const onEscape = () => {
    textareaRef.value = '';
    newEntry.value = '';
    entryToEdit.value.id = null;
    entryToEdit.value.text = '';
  };

  const autoResize = () => {
    nextTick(() => {
      const el = textareaElemRef.value;
      if (!el) {
        return;
      }
      el.style.height = 'auto'; // reset first
      el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
    });
  };

  onMounted(() => {
    autoResize();
    const el = textareaElemRef.value;
    if (!el) {
      return;
    }
    el.focus();
  });
  watch(
    () => entryToEdit.value.id,
    (id) => {
      if (!id) {
        onEscape();
        return;
      }
      const el = textareaElemRef.value;
      if (!el) {
        return;
      }
      const entry = entries.value.find((e) => e.id === id);
      textareaRef.value = entry?.text || '';
      el.focus();
    },
  );
  watch(textareaRef, (textareaValue) => {
    autoResize();
    if (entryToEdit.value.id) {
      entryToEdit.value.text = textareaValue;
      return;
    }
    newEntry.value = textareaValue;
  });

  return {
    textareaElemRef,
    textareaRef,
    maxHeight: `${maxHeight}px`,
    autoResize,
    onEnter,
    onEscape,
  };
}
