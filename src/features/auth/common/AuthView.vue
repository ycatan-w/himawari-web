<script setup lang="ts">
import { useRoute } from 'vue-router'

defineProps<{
  title: string
  info: {
    text: string
    linkText: string
    routePath: string
  }
}>();

const route = useRoute();
</script>

<template>
  <section :class="`auth-main-${route.meta.themeValue}`">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="/" :class="`flex items-center mb-6 text-2xl font-semibold auth-text-${route.meta.themeValue}`">
          <img class="w-8 h-8 mr-2" src="@/assets/himawari-logo.svg" alt="logo" />
          Himawari - The Journal
      </a>
      <div :class="`auth-container auth-container-${route.meta.themeValue}`">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 :class="`auth-title auth-text-${route.meta.themeValue}`">
            {{ title }}
          </h1>
          <slot></slot>
          <p :class="`text-sm font-light auth-text-${route.meta.themeValue}`">
            {{ info.text }} <router-link :to="info.routePath" class="font-medium text-primary-500 hover:underline">{{ info.linkText }}</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
