<script setup lang="ts">
import { IconEventFlow, IconLogout, IconRefresh } from '@/components/ui/icons'
import { PlannerView } from '@/features/planner';
import { useDashboard } from './useDashboard';
import type { LocalStorageProvider } from '@/modules/providers/local-storage-provider';
import { ref } from 'vue';
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
</script>

<template>
  <header class="fixed flex items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl lg:px-4 bg-gray-800">
    <div class="flex items-center">
      <router-link to="/" class="flex">
        <img class="h-10 w-10 mr-3" src="@/assets/himawari-logo.svg"/>
        <span class="self-center hidden md:block text-2xl font-semibold whitespace-nowrap text-white">Himawari - The Journal</span>
      </router-link>

      <span class="pl-2">
        <div class="relative group">
          <button @click="logoutAction()" type="button" class="cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center btn-amber-700">
            <IconLogout />
          </button>
        </div>
      </span>

      <span  v-if="mode === 'local'">
        <div class="relative group">
          <button
            @click="resetDataAction()"
            type="button"
            class="cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center btn-amber-700"
          >
            <IconRefresh /> <span class="hidden md:block">Reset demo data</span>
          </button>
        </div>
      </span>
    </div>
  </header>

  <div class="flex pt-17 h-full text-white">
    <main class="flex-1 overflow-auto">
      <PlannerView />
      <button
        class="cursor-pointer z-25 fixed bottom-1 right-1 p-3 rounded-full bg-amber-600 hover:bg-amber-500"
        @click="showSidebar = !showSidebar"
      >
        <IconEventFlow />
      </button>
    </main>
    <transition name="slide">
      <aside
        v-if="showSidebar"
        :class="[
          'fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-700 shadow-lg'
        ]"
      >
        <EventFlow />
      </aside>
    </transition>
  </div>

  <Toast ref="toastRef" />
</template>
