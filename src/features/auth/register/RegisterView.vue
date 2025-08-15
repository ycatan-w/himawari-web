<script setup lang="ts">
import Auth from '../common/AuthView.vue';
import RegisterForm from './RegisterForm.vue';
</script>

<template>
  <Auth
    :title="$t('title.register')"
    :info="{
      text: $t('text.hasAccount'),
      routePath: '/login',
      linkText: $t('link.login')
    }"
  >
    <RegisterForm />
  </Auth>
</template>
