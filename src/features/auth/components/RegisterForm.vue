<script setup lang="ts">
import { FloatingInputFilled, SubmitButton } from '@/components/input';
import { useRegister } from '../composables/useRegister';
import { useFeatureColorTheme } from '@/utils/colorTheme';
import { IconRegister } from '@/components/icons';

const { form, usernameErrors, passwordErrors, registerAction } = useRegister();
const { colorPalette } = useFeatureColorTheme('auth');
</script>

<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="registerAction">
    <FloatingInputFilled
      v-model="form.username"
      id="username"
      type="text"
      :label="$t('auth.register.label.username')"
      :error="usernameErrors.length > 0"
      :errorMsg="usernameErrors"
      :color-scheme="colorPalette"
      autocomplete="off"
      required
    />

    <FloatingInputFilled
      v-model="form.password"
      id="password"
      type="password"
      :label="$t('auth.register.label.password')"
      :error="passwordErrors.length > 0"
      :color-scheme="colorPalette"
      autocomplete="off"
      required
    />
    <FloatingInputFilled
      v-model="form.passwordConfirm"
      id="confirm_password"
      type="password"
      :label="$t('auth.register.label.confirmPassword')"
      :error="passwordErrors.length > 0"
      :errorMsg="passwordErrors"
      :color-scheme="colorPalette"
      autocomplete="off"
      required
    />

    <SubmitButton class="sm:w-full">
      <IconRegister /> {{ $t('auth.register.button.register') }}
    </SubmitButton>
  </form>
</template>
