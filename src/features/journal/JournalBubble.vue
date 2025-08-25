<script setup lang="ts">
import { IconDelete, IconDropdownDots, IconEdit } from '@/components/ui/icons';
import { useJournalBubble } from './useJournalBubble';
import { inject, ref, toRef, watch } from 'vue';
import type { JournalData } from '@/modules/providers/base-provider';
import { renderedMarkdown } from '@/utils/utils';
import { getCurrentUser } from '@/modules/auth';
import BaseModal from '@/components/common/BaseModal.vue';

const entryToEdit = defineModel<{
  id: number|null
  text: string
}>('entryToEdit', {default: {id: null, text: ''}});
const props = defineProps<{
  entries: JournalData[]
  newEntry: string
}>();
const { themeColors } = inject("journalContext") as {
  themeColors: string
};
const { newEntryBubbleRef, entriesContainerRef, entryToDeleteRef, deleteAction } = useJournalBubble(toRef(props, 'entries'), toRef(props, 'newEntry'));
const currentUser = getCurrentUser();
const confirmDeleteOpen = ref(false);
</script>

<template>
  <BaseModal
    v-model:open="confirmDeleteOpen"
    :title="$t('modal.delete.title')"
    :message="$t('modal.delete.message_journal')"
    :confirm-text="$t('modal.delete.delete')"
    :cancel-text="$t('modal.delete.cancel')"
    @confirm="deleteAction()"
    :themeColors="themeColors"
  />

  <div class="flex-1 overflow-y-auto rounded-t max-h-125" ref="entriesContainerRef">
    <div
      v-for="(entry, i) in entries"
      :key="i"
      :class="[
        `flex gap-3 items-start py-3 p-2 border-b bubble-${themeColors}`,
        entryToEdit.id === entry.id && 'opacity-60'
      ]"
    >
      <div :class="`w-10 h-10 rounded-full bubble-user-${themeColors} flex items-center justify-center text-white font-bold uppercase`">
        {{ currentUser?.[0] ?? "U" }}
      </div>

      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-200">{{ currentUser ?? 'User' }} </span>
          <span class="text-xs text-white/70 italic">{{ entry.date }}</span>

          <div class="flex items-center space-x-1 ml-auto text-xs">
              <button
                @click="entryToEdit.id = (entryToEdit.id === entry.id ? null: entry.id); entryToEdit.text = (entryToEdit.id === entry.id ? '' : entry.text);"
                type="button"
                :class="`p-2 cursor-pointer btn-${themeColors}-500`"
              >
                <IconEdit />
              </button>
              <button
                @click="confirmDeleteOpen = true; entryToDeleteRef = entry.id;"
                type="button"
                :class="`p-2 cursor-pointer text-red-500 hover:text-white hover:bg-red-500`"
              >
                <IconDelete />
              </button>
            </div>
        </div>

        <div class="mt-1 prose prose-invert max-w-none text-sm">
          <p v-if="entryToEdit.text && entryToEdit.id === entry.id" v-html="renderedMarkdown(entryToEdit.text)"></p>
          <p v-else v-html="renderedMarkdown(entry.text)"></p>
        </div>
      </div>
    </div>

    <div
      v-if="newEntryBubbleRef"
      :class="`flex gap-3 items-start py-3 p-2 border-b bubble-${themeColors} opacity-60`"
    >
      <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold uppercase">
        {{ currentUser?.[0] ?? "U" }}
      </div>

      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-200">{{ currentUser ?? 'User' }} </span>
          <span class="text-xs text-gray-400">{{ $t('label.journal_preview') }}</span>
        </div>

        <div class="mt-1 prose prose-invert max-w-none text-sm">
          <p v-html="newEntryBubbleRef"></p>
        </div>
      </div>
    </div>

  </div>
</template>
