<script setup lang="ts">
import { FloatingInputFilled, SubmitButton } from '@/components/ui/input';
import { IconInfo } from '@/components/ui/icons';
import { useLogin } from './useLogin'

const { form, error, loginAction } = useLogin();
</script>

<template>
  <form class="space-y-4 md:space-y-6"  @submit.prevent="loginAction">
    <FloatingInputFilled
      v-model="form.username"
      id="username"
      type="text"
      :label="$t('label.username')"
      autocomplete="off"
      required
    />

    <FloatingInputFilled
      v-model="form.password"
      id="password"
      type="password"
      :label="$t('label.password')"
      required
    />
    <SubmitButton :label=" $t('button.signIn')" />
  </form>

  <div v-if="error" class="fixed inset-x-0 bottom-0 z-50 flex gap-2 mb-0">
    <div id="alert-border-2" class="flex w-full items-center p-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
      <IconInfo />
      <div class="ms-3 text-sm font-medium">
        {{ $t('error.login.invalidAccount') }}
      </div>
    </div>
  </div>
</template>
