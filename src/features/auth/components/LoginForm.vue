<script setup lang="ts">
import { FloatingInputFilled, SubmitButton } from '@/components/input';
import { IconInfo, IconLogin } from '@/components/icons';
import { useLogin } from '../composables/useLogin';
import { useFeatureColorTheme } from '@/utils/colorTheme';

const { form, error, loginAction } = useLogin();
const { colorPalette } = useFeatureColorTheme('auth');
</script>

<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="loginAction">
    <FloatingInputFilled
      v-model="form.username"
      id="username"
      type="text"
      :label="$t('auth.login.label.username')"
      :color-scheme="colorPalette"
      autocomplete="off"
      required
    />

    <FloatingInputFilled
      v-model="form.password"
      id="password"
      type="password"
      :label="$t('auth.login.label.password')"
      :color-scheme="colorPalette"
      required
    />

    <SubmitButton class="sm:w-full">
      <IconLogin /> {{ $t('auth.login.button.signIn') }}
    </SubmitButton>
  </form>

  <div v-if="error" class="fixed inset-x-0 bottom-0 z-50 flex gap-2 mb-0">
    <div
      id="alert-border-2"
      class="flex w-full items-center p-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
      role="alert"
    >
      <IconInfo />
      <div class="ms-3 text-sm font-medium">
        {{ $t('auth.login.error.invalidAccount') }}
      </div>
    </div>
  </div>
</template>
