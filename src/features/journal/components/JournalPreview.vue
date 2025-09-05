<script setup lang="ts">
import { getCurrentUser } from '@/modules/auth';
import type { JournalData } from '@/modules/providers/base-provider';
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';
import { renderedMarkdown } from '@/utils/helper';
const props = defineProps<{
  journal: JournalData;
  colorPalette: Theme;
}>();

const currentUser = getCurrentUser();
const { background, prose } = useCommonColorTheme(props.colorPalette, 'journal_preview');
</script>

<template>
  <div class="flex items-start gap-2.5 max-h-60 overflow-y-auto">
    <div
      :class="[
        'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold uppercase opacity-80',
        background,
      ]"
    >
      {{ currentUser?.[0] ?? 'U' }}
    </div>
    <div
      :class="[
        'flex flex-col w-full max-w-[320px] leading-1.5 p-4 rounded-e-xl rounded-es-xl border border-white/10 opacity-80',
        background,
      ]"
    >
      <div class="flex items-center space-x-2">
        <span class="text-sm font-semibold text-gray-200">{{ currentUser ?? 'User' }}</span>
        <span class="text-sm font-normal text-white/70 italic">{{
          $d(new Date(journal.date), { dateStyle: 'short' })
        }}</span>
      </div>
      <div :class="prose">
        <p class="mt-0 mb-0 text-sm font-normal" v-html="renderedMarkdown(journal.text)"></p>
      </div>
    </div>
  </div>
</template>
