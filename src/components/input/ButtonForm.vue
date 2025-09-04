<script setup lang="ts">
import { useAttrs } from 'vue';

defineProps<{
  type?: 'button' | 'submit' | 'reset' | undefined;
}>();

const attrs = useAttrs();
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      'font-semibold group relative',
      'w-full sm:w-auto cursor-pointer rounded-lg text-md py-2.5',
    ]"
    v-bind="attrs"
  >
    <span class="relative z-10 group-hover:text-white/80 flex items-center justify-center gap-2">
      <slot></slot>
    </span>
    <span
      :class="[
        'absolute left-0 bottom-0 w-full rounded-t-lg h-0.5 transition-all z-0 group-hover:h-full',
        'bg-[currentColor]',
      ]"
    ></span>
  </button>
</template>
