<script setup lang="ts">
import { ref } from "vue";

type Toast = {
  id: number;
  message: string;
};

const toasts = ref<Toast[]>([]);

function addToast(message: string, duration = 5000) {
  const id = Date.now();
  toasts.value.push({ id, message });

  setTimeout(() => {
    removeToast(id);
  }, duration);
}

function removeToast(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

defineExpose({ addToast });
</script>

<template>
  <div class="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
    <transition-group
      name="toast"
      tag="div"
      class="flex flex-col gap-3"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center max-w-xs p-4 rounded-lg shadow-sm bg-gray-800 text-gray-200"
      >
        <span class="flex-1">{{ toast.message }}</span>
        <button
          @click="removeToast(toast.id)"
          class="cursor-pointer ml-3 text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
