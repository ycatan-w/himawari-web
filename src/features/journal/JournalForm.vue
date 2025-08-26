<script setup lang="ts">
import { IconEmoji, IconHead, IconList } from '@/components/ui/icons';
import { useJournalForm } from './useJournalForm';
import { inject, toRef } from 'vue';
import type { JournalData } from '@/modules/providers/base-provider';
import { useCommonColorTheme, useFeatureColorTheme } from '@/utils/colorTheme';

const newEntry = defineModel<string>('newEntry', { default: '' });
const entryToEdit = defineModel<{
  id: number|null
  text: string
}>('entryToEdit', { default: { id: null, text: '' } });

const props = defineProps<{
  entries: JournalData[]
}>();
const { date } = inject("journalContext") as {
  date: Date
};
const { textareaElemRef, textareaRef, maxHeight, autoResize, onEnter, onEscape } = useJournalForm(newEntry, entryToEdit, toRef(props, 'entries'), date);
const { colorPalette, featureColorTheme } = useFeatureColorTheme('overview');
const formColor = useCommonColorTheme(colorPalette, 'form');
</script>

<template>
  <form>
      <div
        :class="[
          'w-full mb-4 rounded-lg',
          featureColorTheme.journal_form_container,
        ]"
      >
        <div :class="`flex items-center justify-between px-3 py-2`">
          <div class="flex flex-wrap items-center sm:divide-x">
            <div class="flex items-center space-x-1 sm:pe-4">
              <button
                type="button"
                :class="[
                  'p-2 rounded-full cursor-pointer',
                  featureColorTheme.journal_log_button,
                ]"
                title="Not implemented yet!"
              >
                <IconEmoji />
              </button>
              <button
                type="button"
                :class="[
                  'p-2 rounded-full cursor-pointer',
                  featureColorTheme.journal_log_button,
                ]"
                title="Not implemented yet!"
              >
                <IconList />
              </button>
              <button
                type="button"
                :class="[
                  'p-2 rounded-full cursor-pointer',
                  featureColorTheme.journal_log_button,
                ]"
                title="Not implemented yet!"
              >
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
            :class="[
              'block py-2.5 px-0 w-full text-sm border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 resize-none h-full peer',
              formColor.textarea_filled,
            ]"
            :style="{ maxHeight }"
            placeholder=" "
            @input="autoResize"
            @keydown.enter.exact.prevent="onEnter"
            @keydown.escape.exact.stop="onEscape"
          ></textarea>
          <label
            for="journal"
            :class="[
              'absolute text-xl duration-300 transform -translate-y-3 scale-75 top-0 z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3',
              formColor.label_filled
            ]"
          >
            {{ $t('label.journal_write') }}
          </label>
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

