<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import IconCancel from '../ui/icons/IconCancel.vue';

const props = defineProps<{
  open: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  themeColors?: string
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>();

const localOpen = ref(props.open);

watch(() => props.open, (val) => localOpen.value = val);

function close() {
  emit('update:open', false);
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
  if (e.key === 'Escape' && localOpen.value) {
    e.stopPropagation();
    close();
  }
}
onMounted(() => document.addEventListener('keydown', onKey));
onUnmounted(() => document.removeEventListener('keydown', onKey));
</script>

<template>
  <Teleport to="body">
    <transition name="fade-scale">
      <div
        v-if="localOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          class="relative bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-700"
        >
          <!-- Accent bar (thématique) -->
          <div
            :class="['absolute top-0 left-0 h-full w-2', `bg-${themeColors}-500`]"
          />

          <!-- Contenu -->
          <div class="p-6 pl-8">
            <h2 class="text-xl font-bold mb-2 text-gray-200">{{ title }}</h2>
            <p class="text-sm text-gray-300 mb-6 leading-relaxed">
              {{ message }}
            </p>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                @click="cancel"
                class="text-sm font-medium text-white inline-flex items-right text-center
                  underline-offset-4 hover:underline transition-colors sm:self-center cursor-pointer"
              >
                <IconCancel /> <span class="ms-1">{{ cancelText }}</span>
              </button>
              <button
                :class="[
                  'px-4 py-2 rounded-xl text-white shadow transition cursor-pointer',
                  themeColors
                    ? `bg-${themeColors}-500 hover:bg-${themeColors}-600`
                    : 'bg-blue-600 hover:bg-blue-700'
                ]"
                @click="confirm"
              >
                {{ confirmText ?? 'Confirmer' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.20s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
