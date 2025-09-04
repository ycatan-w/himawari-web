<script setup lang="ts">
import { IconToday, IconLogout } from '@/components/icons';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { DateNavigatorView } from '@/features/date-navigator';
import { useDashboard } from '../composables/useDashboard';
import TodayPanel from '../components/TodayPanel.vue';
import ResetLocalDataButton from '../components/ResetLocalDataButton.vue';

const { logoutAction } = useDashboard();
const showPanel = ref(false);
const panelRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (panelRef.value && !panelRef.value.contains(event.target as Node)) {
    showPanel.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="flex flex-col h-screen text-white">
    <header class="flex items-center w-full px-3 py-3 mx-auto max-w-8xl lg:px-4 bg-gray-800">
      <router-link to="/" class="flex">
        <img class="h-10 w-10 mr-3" src="@/assets/himawari-logo.svg" />
        <span
          class="self-center hidden md:block text-2xl font-semibold whitespace-nowrap text-white/80"
          >Himawari - The Journal</span
        >
      </router-link>

      <span class="pl-2">
        <div class="relative group">
          <button
            @click="logoutAction()"
            type="button"
            :class="[
              `cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center `,
              `text-amber-700 hover:text-white hover:bg-amber-700`,
            ]"
          >
            <IconLogout />
          </button>
        </div>
      </span>

      <ResetLocalDataButton />
    </header>

    <main class="flex-1 flex flex-col">
      <DateNavigatorView />
      <button
        class="cursor-pointer z-25 fixed bottom-1 right-1 p-3 rounded-full bg-amber-600 hover:bg-amber-500"
        @click.stop="showPanel = !showPanel"
      >
        <IconToday />
      </button>
    </main>
    <transition name="slide">
      <aside
        v-if="showPanel"
        ref="panelRef"
        class="fixed top-0 right-0 h-full w-100 bg-gray-900 border-l border-gray-700 shadow-lg"
      >
        <TodayPanel />
      </aside>
    </transition>
  </div>
</template>

<style lang="css" scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
