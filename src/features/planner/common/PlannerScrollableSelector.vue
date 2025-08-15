<script setup lang="ts">
import type { ModelRef } from 'vue';
import { usePlannerScrollableSelector } from './usePlannerScrollableSelector';

const selected = defineModel<number>() as ModelRef<number>;
const { items, keyAsValue, formatItem = (item: string | number, index: number) => item } = defineProps<{
  label: string
  items: (string|number)[]
  keyAsValue?: boolean
  colorTheme: string
  currentIndex: number
  btnSize: string
  formatItem?: (item: string | number, index: number) => string|number
}>();

const { itemRefs, formattedItems } = usePlannerScrollableSelector(selected, items, keyAsValue);
</script>

<template>
  <div :class="`css-container-${colorTheme} flex h-20`">
    <div class="w-[80px] text-center font-semibold pt-2">{{ label }}</div>
    <div
      class="flex gap-5 w-full h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory p-4"
    >
      <button
        v-for="{ item, index, value } in formattedItems"
        :key="item"
        :ref="el => el && (itemRefs[value] = (el as HTMLElement))"
        @click="selected = value"
        :class="[
          'text-base shrink-0 snap-center cursor-pointer',
          btnSize,
          selected === value ? `css-button-selected-${colorTheme}` : `css-button-${colorTheme}`,
          currentIndex === value && 'border border-red-800'
        ]"
      >
        {{ formatItem(item, index) }}
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import 'tailwindcss';

.css-container-amber { @apply bg-amber-600; }
.css-container-lime { @apply bg-lime-600; }
.css-container-indigo { @apply bg-indigo-600; }

.css-button-amber { @apply bg-amber-500 hover:bg-amber-400; }
.css-button-lime { @apply bg-lime-500 hover:bg-lime-400; }
.css-button-indigo { @apply bg-indigo-500 hover:bg-indigo-400; }

.css-button-selected-amber { @apply bg-amber-700; }
.css-button-selected-lime { @apply bg-lime-700; }
.css-button-selected-indigo { @apply bg-indigo-700; }

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
