<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'

defineProps<{ date: Date, themeColors: string }>();

const markdownText = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

// Line height estimate (1.5rem = 24px), 8 lines = 192px
const maxHeight = '192px';
const renderedMarkdown = computed(() => marked.parse(markdownText.value));

const autoResize = () => {
  const el = textareaRef.value
  if (!el) {
    return;
  }
  el.style.height = 'auto' // reset first
  el.style.height = Math.min(el.scrollHeight, 192) + 'px'
};

onMounted(() => autoResize());
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      :class="[
        'journal-preview',
        `journal-preview-${themeColors}`
      ]"
    >
      <h3 class="text-lg mb-2 font-bold">{{ $t('label.journal_preview') }}</h3>
      <div v-html="renderedMarkdown" class="prose prose-invert max-w-none"></div>
    </div>
    <div
      :class="`separator separator-${themeColors}`"
    ></div>
    <div class="relative">
      <textarea
        v-model="markdownText"
        id="journal"
        name="journal"
        ref="textareaRef"
        rows="2"
        :class="`fi-textarea-filled fi-textarea-filled-${themeColors} peer`"
        :style="{ maxHeight: maxHeight }"
        placeholder=" "
        @input="autoResize"
      ></textarea>
      <label for="journal" :class="`fi-textarea-label-filled fi-textarea-label-filled-${themeColors}`">{{ $t('label.journal_write') }}</label>
      <div class="mt-1 text-xs opacity-75">
        {{ $t('help.journal_format') }}
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:opacity-100"
        >
          {{ $t('help.journal_cheat') }}
        </a>
      </div>
    </div>
    <div class="mt-4">
      <button
        type="submit"
        :class="`btn-form btn-form-${themeColors}`"
      >
        {{ $t('button.journal_publish') }}
      </button>
    </div>
  </div>
</template>

