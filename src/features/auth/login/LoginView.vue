<script setup lang="ts">
import Auth from '../common/AuthView.vue';
import LoginForm from './LoginForm.vue';
</script>

<template>
  <Auth
    :title="$t('title.login')"
    :info="{
      text: $t('text.noAccount'),
      routePath: '/register',
      linkText: $t('link.signUp')
    }"
  >
    <LoginForm />
  </Auth>
</template>
