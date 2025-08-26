<script setup lang="ts">
import { FloatingInputFilled, SubmitButton } from '@/components/ui/input'
import { useRegister } from './useRegister';
import { useFeatureColorTheme } from '@/utils/colorTheme';

const { form, errors, registerAction } = useRegister();
const { colorPalette } = useFeatureColorTheme('auth');
</script>

<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="registerAction">
    <FloatingInputFilled
      v-model="form.username"
      id="username"
      type="text"
      :label="$t('label.username')"
      :error="errors.username"
      :errorMsg="$t('error.register.usernameTaken')"
      :color-scheme="colorPalette"
      autocomplete="off"
      required
    />

    <FloatingInputFilled
      v-model="form.password"
      id="password"
      type="password"
      :label="$t('label.password')"
      :error="errors.password"
      :color-scheme="colorPalette"
      autocomplete="off"
      required
    />
    <FloatingInputFilled
      v-model="form.passwordConfirm"
      id="confirm_password"
      type="password"
      :label="$t('label.confirmPassword')"
      :error="errors.password"
      :errorMsg="$t('error.register.passwordMismatch')"
      :color-scheme="colorPalette"
      autocomplete="off"
      required
    />
    <SubmitButton
      :label=" $t('button.register')"
      :color-scheme="colorPalette"
    />
  </form>
</template>
