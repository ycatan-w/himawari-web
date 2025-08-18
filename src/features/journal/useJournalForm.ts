import { marked } from "marked";
import { computed, onMounted, ref } from "vue";
import { getProvider } from '@/modules/providers';

export function useJournalForm(dateStr: string) {
  const markdownTextRef = ref('');
  const textareaRef = ref<HTMLTextAreaElement | null>(null);
  const provider = getProvider();

  // Line height estimate (1.5rem = 24px), 8 lines = 192px
  const maxHeight = '192px';
  const renderedMarkdown = computed(() => marked.parse(markdownTextRef.value));

  const autoResize = () => {
    const el = textareaRef.value
    if (!el) {
      return;
    }
    el.style.height = 'auto' // reset first
    el.style.height = Math.min(el.scrollHeight, 192) + 'px'
  };

  onMounted(async () => {
    autoResize();
    markdownTextRef.value = (await provider.getJournal(dateStr))?.text || '';
  });

  return { markdownTextRef, textareaRef, maxHeight, renderedMarkdown, autoResize };
}
