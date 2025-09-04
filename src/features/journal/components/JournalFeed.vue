<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useFeatureColorTheme } from '@/utils/colorTheme';
import { renderedMarkdown } from '@/utils/helper';
import type { JournalData } from '@/modules/providers/base-provider';
import { getCurrentUser } from '@/modules/auth';
import { IconDelete, IconEdit } from '@/components/icons';
import { ConfirmDeleteModal } from '@/components/common';
import { useJournalFeed } from '../composables/useJournalFeed';
import JournalPreview from './JournalPreview.vue';

const entryToEdit = defineModel<{
  id: number | null;
  text: string;
}>('entryToEdit', { default: { id: null, text: '' } });
const props = defineProps<{
  entries: JournalData[];
  newEntry: string;
}>();
const { selectedJournal, newEntryBubbleRef, entriesContainerRef, entryToDeleteRef, deleteAction } =
  useJournalFeed(toRef(props, 'entries'), toRef(props, 'newEntry'));
const currentUser = getCurrentUser();
const confirmDeleteOpen = ref(false);
const { colorPalette, featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <ConfirmDeleteModal
    v-model="confirmDeleteOpen"
    :title="$t('journal.feed.delete.title')"
    :message="$t('journal.feed.delete.message')"
    @confirm="deleteAction()"
  >
    <JournalPreview :journal="selectedJournal" :color-palette="colorPalette" />
  </ConfirmDeleteModal>

  <div class="flex-1 overflow-y-auto scrollbar-auto rounded-t max-h-120" ref="entriesContainerRef">
    <div
      v-for="(entry, i) in entries"
      :key="i"
      :class="[
        'flex gap-3 items-start py-3 p-2 bg-white/3',
        entryToEdit.id === entry.id && 'opacity-60',
      ]"
    >
      <div
        :class="[
          'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase opacity-80',
          featureColorTheme.journal_log_user,
        ]"
      >
        {{ currentUser?.[0] ?? 'U' }}
      </div>

      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-200 opacity-80">{{ currentUser ?? 'User' }} </span>
          <span class="text-xs text-white/70 italic opacity-80">{{ entry.date }}</span>

          <div class="flex items-center space-x-1 ml-auto text-xs">
            <button
              @click="[
                (entryToEdit.id = entryToEdit.id === entry.id ? null : entry.id),
                (entryToEdit.text = entryToEdit.id === entry.id ? '' : entry.text),
              ]"
              type="button"
              :class="['p-2 cursor-pointer', featureColorTheme.journal_log_button]"
            >
              <IconEdit />
            </button>
            <button
              @click="[
                (confirmDeleteOpen = true),
                (entryToDeleteRef = entry.id),
                (selectedJournal = entry),
              ]"
              type="button"
              :class="`p-2 cursor-pointer hover:text-white/80 hover:bg-red-700/80`"
            >
              <IconDelete />
            </button>
          </div>
        </div>

        <div :class="['mt-1 max-w-none opacity-70', featureColorTheme.journal_prose]">
          <p
            v-if="entryToEdit.text && entryToEdit.id === entry.id"
            v-html="renderedMarkdown(entryToEdit.text)"
          ></p>
          <p v-else v-html="renderedMarkdown(entry.text)"></p>
        </div>
      </div>
    </div>

    <div
      v-if="newEntryBubbleRef"
      :class="[
        'flex gap-3 items-start py-3 p-2 border-b opacity-60',
        featureColorTheme.journal_log,
      ]"
    >
      <div
        :class="[
          `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase`,
          featureColorTheme.journal_log_user,
        ]"
      >
        {{ currentUser?.[0] ?? 'U' }}
      </div>

      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-200">{{ currentUser ?? 'User' }} </span>
          <span class="text-xs text-gray-400">{{ $t('journal.feed.preview') }}</span>
        </div>

        <div :class="['mt-1 max-w-none', featureColorTheme.journal_prose]">
          <p v-html="newEntryBubbleRef"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.scrollbar-auto {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent; /* Firefox */
}

/* Chrome, Edge, Safari */
.scrollbar-auto::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-auto::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-auto::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  transition: background-color 0.2s;
}

.scrollbar-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
