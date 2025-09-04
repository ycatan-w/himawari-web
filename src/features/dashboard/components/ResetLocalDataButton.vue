<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getProvider, getProviderMode } from '@/modules/providers';
import type { LocalStorageProvider } from '@/modules/providers/local-storage-provider';
import { Toast } from '@/components/common';
import { IconRefresh } from '@/components/icons';

const mode = getProviderMode();
const provider = getProvider();
const { t } = useI18n();

function onClickResetData() {
  (provider as LocalStorageProvider).resetDemoData();
  toastRef.value?.addToast(t('dashboard.localStorage.text'), 5000);
}
const toastRef = ref<InstanceType<typeof Toast> | null>(null);
</script>

<template>
  <span v-if="mode === 'local'">
    <div class="relative group">
      <button
        @click="onClickResetData()"
        type="button"
        :class="[
          'cursor-pointer font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center',
          'text-amber-700 hover:text-white hover:bg-amber-700',
        ]"
      >
        <IconRefresh />
        <span class="hidden md:block">{{ t('dashboard.localStorage.button') }}</span>
      </button>
    </div>

    <Toast ref="toastRef" />
  </span>
</template>
