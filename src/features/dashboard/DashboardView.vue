<script setup lang="ts">
import { IconEventFlow, IconLogout, IconRefresh } from '@/components/ui/icons'
import { PlannerView } from '@/features/planner';
import { useDashboard } from './useDashboard';
import type { LocalStorageProvider } from '@/modules/providers/local-storage-provider';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getProvider, getProviderMode } from '@/modules/providers';
import EventFlow from './EventFlow.vue';
import Toast from '@/components/common/Toast.vue';

const { logoutAction } = useDashboard();
const mode = getProviderMode();
const provider = getProvider();

function resetDataAction() {
  if (mode === 'local') {
    (provider as LocalStorageProvider).resetDemoData();
    toastRef.value?.addToast("Demo data has been reset.", 5000);
  }
}
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
const showSidebar = ref(false);
const sidebarRef = ref<HTMLElement | null>(null);
const colors = 'text-amber-700 hover:text-white hover:bg-amber-700';

function handleClickOutside(event: MouseEvent) {
  if (!sidebarRef.value) return;
  if (!sidebarRef.value.contains(event.target as Node)) {
    showSidebar.value = false;
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
        <img class="h-10 w-10 mr-3" src="@/assets/himawari-logo.svg"/>
        <span class="self-center hidden md:block text-2xl font-semibold whitespace-nowrap text-white/80">Himawari - The Journal</span>
      </router-link>

      <span class="pl-2">
        <div class="relative group">
          <button
            @click="logoutAction()"
            type="button"
            :class="[
              `cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center btn-amber-700`,
              colors
            ]">
            <IconLogout />
          </button>
        </div>
      </span>

      <span  v-if="mode === 'local'">
        <div class="relative group">
          <button
            @click="resetDataAction()"
            type="button"
            :class="[
              `cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center`,
              colors
            ]"
          >
            <IconRefresh /> <span class="hidden md:block">Reset demo data</span>
          </button>
        </div>
      </span>
    </header>

    <main class="flex-1 flex flex-col">
      <PlannerView />
      <button
        class="cursor-pointer z-25 fixed bottom-1 right-1 p-3 rounded-full bg-amber-600 hover:bg-amber-500"
        @click.stop="showSidebar = !showSidebar"
      >
        <IconEventFlow />
      </button>
    </main>
    <transition name="slide">
      <aside
        v-if="showSidebar"
        ref="sidebarRef"
        class="fixed top-0 right-0 h-full w-100 bg-gray-900 border-l border-gray-700 shadow-lg"
      >
        <EventFlow />
      </aside>
    </transition>
  </div>

  <Toast ref="toastRef" />
</template>

<style lang="css" scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
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