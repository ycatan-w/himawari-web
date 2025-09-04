<script setup lang="ts">
import Auth from './AuthView.vue';
import RegisterForm from '../components/RegisterForm.vue';
</script>

<template>
  <Auth
    :title="$t('auth.register.title')"
    :info="{
      text: $t('auth.register.hasAccount'),
      routePath: '/login',
      linkText: $t('auth.register.link'),
    }"
  >
    <RegisterForm />
  </Auth>
</template>
