<script setup lang="ts">
import Auth from './AuthView.vue';
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
  <Auth
    :title="$t('auth.login.title')"
    :info="{
      text: $t('auth.login.noAccount'),
      routePath: '/register',
      linkText: $t('auth.login.link'),
    }"
  >
    <LoginForm />
  </Auth>
</template>
