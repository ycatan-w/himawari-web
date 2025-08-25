import { getProvider } from "@/modules/providers";
import type { JournalData } from "@/modules/providers/base-provider";
import { onMounted, reactive, ref } from "vue";

export function useJournalSection(dateStr: string) {
  const journalEntriesRef = ref<JournalData[]>([]);
  const newEntryRef = ref('');
  const entryToEditRef = reactive<{
    id: number|null
    text: string
  }>({
    id: null,
    text: ''
  });
  const provider = getProvider();
  onMounted(() => {
    provider.getJournal(dateStr).then((data) => {
      journalEntriesRef.value = data || [];
    });
  });

  return { journalEntriesRef, newEntryRef, entryToEditRef };
}
