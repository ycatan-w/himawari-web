<script setup lang="ts">
import { IconEmoji, IconHead, IconList } from '@/components/ui/icons';
import { useJournalForm } from './useJournalForm';
import { inject, toRef } from 'vue';
import type { JournalData } from '@/modules/providers/base-provider';

const newEntry = defineModel<string>('newEntry', { default: '' });
const entryToEdit = defineModel<{
  id: number|null
  text: string
}>('entryToEdit', { default: { id: null, text: '' } });

const props = defineProps<{
  entries: JournalData[]
}>();
const { themeColors, date } = inject("journalContext") as {
  themeColors: string
  date: Date
};
const { textareaElemRef, textareaRef, maxHeight, autoResize, onEnter, onEscape } = useJournalForm(newEntry, entryToEdit, toRef(props, 'entries'), date);
</script>

<template>
  <form>
      <div :class="`w-full mb-4 rounded-lg bg-${themeColors}-800`">
        <div :class="`flex items-center justify-between px-3 py-2`">
          <div class="flex flex-wrap items-center sm:divide-x">
            <div class="flex items-center space-x-1 sm:pe-4">
              <button type="button" :class="`p-2 rounded-full cursor-pointer btn-${themeColors}-500`" title="Not implemented yet!">
                <IconEmoji />
              </button>
              <button type="button" :class="`p-2 rounded-full cursor-pointer btn-${themeColors}-500`" title="Not implemented yet!">
                <IconList />
              </button>
              <button type="button" :class="`p-2 rounded-full cursor-pointer btn-${themeColors}-500`" title="Not implemented yet!">
                <IconHead />
              </button>
            </div>
          </div>
        </div>

        <div class="relative block mt-3 mx-2">
          <textarea
            v-model="textareaRef"
            id="journal"
            name="journal"
            ref="textareaElemRef"
            rows="2"
            :class="`fi-textarea-filled  fi-textarea-filled-${themeColors} peer`"
            :style="{ maxHeight }"
            placeholder=" "
            @input="autoResize"
            @keydown.enter.exact.prevent="onEnter"
            @keydown.escape.exact.stop="onEscape"
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
      </div>
  </form>
</template>

