<script setup lang="ts">
import { useJournalForm } from './useJournalForm';

const props = defineProps<{ date: Date, themeColors: string }>();
const dateStr = props.date.toISOString().split('T')[0];
const { markdownTextRef, textareaRef, maxHeight, renderedMarkdown, autoResize } = useJournalForm(dateStr);
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
        v-model="markdownTextRef"
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

