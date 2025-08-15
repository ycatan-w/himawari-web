<script setup lang="ts">
import { IconLogout } from '@/components/ui/icons'
import { PlannerView } from '@/features/planner';
import { useDashboard } from './useDashboard';

const { logoutAction } = useDashboard();
</script>

<template>
  <header class="fixed flex items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl lg:px-4 bg-gray-800">
    <div class="flex items-center">
      <a href="/" class="flex">
        <img class="h-auto max-w-10 mr-3" src="@/assets/himawari-logo.svg"/>
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Himawari - The Journal</span>
      </a>

      <span class="pl-12">
        <div class="relative group">
          <button @click="logoutAction()" type="button" class="cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 text-amber-700 hover:text-white hover:bg-amber-700">
            <IconLogout />
          </button>
        </div>
      </span>
    </div>
  </header>
  <main class="pt-17">
    <PlannerView />
  </main>
</template>
