<script setup lang="ts">
import { useFeatureColorTheme } from '@/utils/colorTheme';

defineProps<{
  title: string
  info: {
    text: string
    linkText: string
    routePath: string
  }
}>();

const { featureColorTheme } = useFeatureColorTheme('auth');
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <router-link
        to="/"
        :class="[
          'flex items-center mb-6 text-2xl font-semibold',
          featureColorTheme.text
        ]"
      >
        <img class="w-8 h-8 mr-2" src="@/assets/himawari-logo.svg" alt="logo" />
        Himawari - The Journal
      </router-link>
      <div
        :class="[
          'w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0',
          featureColorTheme.container
        ]"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            :class="[
              'text-xl font-bold leading-tight tracking-tight md:text-2xl',
              featureColorTheme.text
            ]"
          >
            {{ title }}
          </h1>
          <slot></slot>
          <p
            :class="[
              'text-sm font-light',
              featureColorTheme.text
            ]"
          >
            {{ info.text }} <router-link :to="info.routePath" class="font-medium text-primary-500 hover:underline">{{ info.linkText }}</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
