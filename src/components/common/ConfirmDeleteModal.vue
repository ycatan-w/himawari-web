<script setup lang="ts">
import { IconCancel } from '@/components/icons';
import { onMounted, onUnmounted } from 'vue';
import { ButtonForm } from '@/components/input';
import { useFeatureColorTheme } from '@/utils/colorTheme';

const show = defineModel<boolean>({ default: false });
const props = defineProps<{
  title?: string;
  message?: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

function close() {
  show.value = false;
}

function confirm() {
  emit('confirm');
  close();
}

function cancel() {
  emit('cancel');
  close();
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && show.value) {
    e.stopPropagation();
    close();
  }
}
onMounted(() => document.addEventListener('keydown', onKey));
onUnmounted(() => document.removeEventListener('keydown', onKey));
const { featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="close"
  >
    <div :class="['relative rounded-lg shadow-lg w-full max-w-md p-5', featureColorTheme.body]">
      <div class="absolute inset-0 bg-white/2 pointer-events-none"></div>
      <div class="relative">
        <h2 class="text-xl font-bold capitalize">{{ title }}</h2>
        <p class="mt-2 text-base opacity-90">{{ message }}</p>

        <div class="mt-4 p-2">
          <slot />
        </div>

        <div class="flex justify-end gap-3">
          <button
            type="button"
            @click="cancel()"
            class="text-sm font-medium text-white/80 inline-flex items-right text-center underline-offset-4 hover:underline transition-colors sm:self-center cursor-pointer"
          >
            <IconCancel /> <span class="ms-1">{{ $t('common.button.cancel') }}</span>
          </button>

          <ButtonForm @click="confirm()" class="px-5 w-auto text-red-700/80">
            {{ $t('common.button.delete') }}
          </ButtonForm>
        </div>
      </div>
    </div>
  </div>
</template>
