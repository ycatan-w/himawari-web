<script setup lang="ts">
import { IconCircleCloseOutline, IconCircleCloseSolid, IconClose, IconDelete, IconEdit } from '@/components/ui/icons';
import { useJournalBubble } from './useJournalBubble';
import { ref, toRef } from 'vue';
import type { JournalData } from '@/modules/providers/base-provider';
import { renderedMarkdown } from '@/utils/utils';
import { getCurrentUser } from '@/modules/auth';
// import BaseModal from '@/components/common/BaseModal.vue';
import { useFeatureColorTheme, type Theme } from '@/utils/colorTheme';
import ConfirmDeleteModal from '@/components/common/ConfirmDeleteModal.vue';
import JournalPreview from './JournalPreview.vue';

const entryToEdit = defineModel<{
  id: number|null
  text: string
}>('entryToEdit', {default: {id: null, text: ''}});
const props = defineProps<{
  entries: JournalData[]
  newEntry: string
}>();
const { selectedJournal, newEntryBubbleRef, entriesContainerRef, entryToDeleteRef, deleteAction } = useJournalBubble(toRef(props, 'entries'), toRef(props, 'newEntry'));
const currentUser = getCurrentUser();
const confirmDeleteOpen = ref(false);
const { colorPalette, featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <ConfirmDeleteModal
    v-model="confirmDeleteOpen"
    :title="$t('modal.delete.title_journal')"
    :message="$t('modal.delete.message_journal')"
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
        entryToEdit.id === entry.id && 'opacity-60'
      ]"
    >
      <div
        :class="[
          'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase opacity-80',
           featureColorTheme.journal_log_user,
        ]"
      >
        {{ currentUser?.[0] ?? "U" }}
      </div>

      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-200 opacity-80">{{ currentUser ?? 'User' }} </span>
          <span class="text-xs text-white/70 italic opacity-80">{{ entry.date }}</span>

          <div class="flex items-center space-x-1 ml-auto text-xs">
              <button
                @click="[
                  entryToEdit.id = (entryToEdit.id === entry.id ? null : entry.id),
                  entryToEdit.text = (entryToEdit.id === entry.id ? '' : entry.text)
                ]"
                type="button"
                :class="[
                  'p-2 cursor-pointer',
                  featureColorTheme.journal_log_button,
                ]"
              >
                <IconEdit />
              </button>
              <button
                @click="[
                  confirmDeleteOpen = true,
                  entryToDeleteRef = entry.id,
                  selectedJournal = entry
                ]"
                type="button"
                :class="`p-2 cursor-pointer hover:text-white/80 hover:bg-red-700/80`"
              >
                <IconDelete />
              </button>
            </div>
        </div>

        <div
          :class="[
            'mt-1 max-w-none opacity-70',
            featureColorTheme.journal_prose
          ]"
        >
          <p v-if="entryToEdit.text && entryToEdit.id === entry.id" v-html="renderedMarkdown(entryToEdit.text)"></p>
          <p v-else v-html="renderedMarkdown(entry.text)"></p>
        </div>
      </div>
    </div>

    <div
      v-if="newEntryBubbleRef"
      :class="[
        'flex gap-3 items-start py-3 p-2 border-b opacity-60',
        featureColorTheme.journal_log
      ]"
    >
      <div
        :class="[
          `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold uppercase`,
          featureColorTheme.journal_log_user,
        ]"
      >
        {{ currentUser?.[0] ?? "U" }}
      </div>

      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-200">{{ currentUser ?? 'User' }} </span>
          <span class="text-xs text-gray-400">{{ $t('label.journal_preview') }}</span>
        </div>

        <div
          :class="[
            'mt-1 max-w-none',
            featureColorTheme.journal_prose
          ]"
        >
          <p v-html="newEntryBubbleRef"></p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div
    :class="[
      'flex items-center p-2 mb-2 border-t-4',
      'text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800'
    ]"
  >
    <button type="button" class="relative cursor-pointer p-1">
      <IconCircleCloseOutline class="absolute inset-0 transition-opacity duration-200 opacity-100 hover:opacity-0" />
      <IconCircleCloseSolid class="text-white/80 absolute inset-0 transition-opacity duration-200 opacity-0 hover:opacity-100" />
    </button>
    <div class="ms-3 text-sm font-medium">
      A simple info alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
    </div>
</div> -->
</template>

<style lang="css" scoped>
.scrollbar-auto {
  scrollbar-width: thin;           /* Firefox */
  scrollbar-color: rgba(255,255,255,0.5) transparent; /* Firefox */
}

/* Chrome, Edge, Safari */
.scrollbar-auto::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-auto::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-auto::-webkit-scrollbar-thumb {
  background-color: rgba(255,255,255,0.5);
  border-radius: 3px;
  transition: background-color 0.2s;
}

.scrollbar-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255,255,255,0.8);
}
</style>
