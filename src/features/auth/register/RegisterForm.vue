<script setup lang="ts">
import { FloatingInputFilled, SubmitButton } from '@/components/ui/input'
import { useRegister } from './useRegister';

const { form, errors, registerAction } = useRegister();
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
      autocomplete="off"
      required
    />

    <FloatingInputFilled
      v-model="form.password"
      id="password"
      type="password"
      :label="$t('label.password')"
      :error="errors.password"
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
      autocomplete="off"
      required
    />
    <SubmitButton :label=" $t('button.register')" />
  </form>
</template>
