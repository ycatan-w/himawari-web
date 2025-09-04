<script setup lang="ts">
import { inject, toRef } from 'vue';
import { useCommonColorTheme, useFeatureColorTheme } from '@/utils/colorTheme';
import type { JournalData } from '@/modules/providers/base-provider';
import {
  IconCircleCloseOutline,
  IconCircleCloseSolid,
  IconFlower,
  IconPublish,
} from '@/components/icons';
import { useJournalForm } from '../composables/useJournalForm';

const newEntry = defineModel<string>('newEntry', { default: '' });
const entryToEdit = defineModel<{
  id: number | null;
  text: string;
}>('entryToEdit', { default: { id: null, text: '' } });

const props = defineProps<{
  entries: JournalData[];
}>();
const { date } = inject('journalContext') as {
  date: Date;
};
const { textareaElemRef, textareaRef, maxHeight, autoResize, onEnter, onEscape } = useJournalForm(
  newEntry,
  entryToEdit,
  toRef(props, 'entries'),
  date,
);
const { colorPalette } = useFeatureColorTheme('overview');
const formColor = useCommonColorTheme(colorPalette, 'form');
</script>

<template>
  <div
    v-if="entryToEdit.id"
    class="flex items-center gap-2 px-3 py-2 bg-white/10 border-b border-white/10"
  >
    <button
      @click="onEscape"
      type="button"
      class="group relative text-white/70 hover:text-white cursor-pointer"
    >
      <IconCircleCloseOutline class="block group-hover:hidden" />
      <IconCircleCloseSolid class="hidden group-hover:block" />
    </button>
    <span class="text-sm text-white/80">
      {{ $t('journal.form.update') }}
    </span>
  </div>
  <form>
    <div class="relative mt-5">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <IconFlower />
      </div>
      <textarea
        v-model="textareaRef"
        id="journal"
        name="journal"
        ref="textareaElemRef"
        rows="2"
        :class="[
          'block py-0 md:py-2.5 pl-15 pr-25 w-full text-sm border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 resize-none h-full peer',
          formColor.input_standard,
        ]"
        :style="{ maxHeight }"
        placeholder=" "
        @input="autoResize"
        @keydown.escape.exact.stop="onEscape"
      ></textarea>
      <label
        for="journal"
        :class="[
          'cursor-text pl-15 absolute text-lg md:text-xl duration-300 transform -translate-y-6 md:-translate-y-4 scale-75 top-0 z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 md:peer-focus:-translate-y-4',
          formColor.label_standard,
        ]"
      >
        {{ $t('journal.form.write') }}
      </label>
      <button
        type="button"
        @click="onEnter"
        class="rounded-full absolute end-2.5 top-2.5 text-sm p-3 group cursor-pointer"
      >
        <span
          class="relative z-10 text-white/80 md:text-[currentColor] group-hover:text-white/80 flex items-center justify-center gap-2"
        >
          <IconPublish />
        </span>
        <span
          :class="[
            'absolute left-0 bottom-0 w-full rounded-full h-full md:h-0 transition-all z-0 group-hover:h-full',
            'bg-[currentColor]',
          ]"
        ></span>
      </button>
    </div>
    <div class="mt-3 text-sm opacity-80">
      {{ $t('journal.form.helper.message') }}
      <a
        href="https://www.markdownguide.org/cheat-sheet/"
        target="_blank"
        rel="noopener noreferrer"
        class="underline hover:text-white/80"
      >
        {{ $t('journal.form.helper.link') }}
      </a>
    </div>
  </form>
</template>
