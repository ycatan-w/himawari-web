<script setup lang="ts">
import { IconLogout } from '@/components/ui/icons'
import { PlannerView } from '@/features/planner';
import { useDashboard } from './useDashboard';
import IconRefresh from '@/components/ui/icons/IconRefresh.vue';
import { getProvider, getProviderMode } from '@/modules/providers/provider-proxy';
import type { LocalStorageProvider } from '@/modules/providers/local-storage-provider';

const { logoutAction } = useDashboard();
const mode = getProviderMode();
const provider = getProvider();

function resetDataAction() {
  if (mode === 'local') {
    (provider as LocalStorageProvider).resetDemoData();
  }
}

</script>

<template>
  <header class="fixed flex items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl lg:px-4 bg-gray-800">
    <div class="flex items-center">
      <router-link to="/" class="flex">
        <img class="h-auto max-w-10 mr-3" src="@/assets/himawari-logo.svg"/>
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Himawari - The Journal</span>
      </router-link>

      <span class="pl-12">
        <div class="relative group">
          <button @click="logoutAction()" type="button" class="cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 text-amber-700 hover:text-white hover:bg-amber-700">
            <IconLogout />
          </button>
        </div>
      </span>

      <span class="pl-1" v-if="mode === 'local'">
        <div class="relative group">
          <button @click="resetDataAction()" type="button" class="cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 text-amber-700 hover:text-white hover:bg-amber-700">
            <IconRefresh /> Reset Demo data
          </button>
        </div>
      </span>
    </div>
  </header>
  <main class="pt-17">
    <PlannerView />
  </main>
</template>
