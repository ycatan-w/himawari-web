<script setup lang="ts">
import type { ModelRef } from 'vue';
import { usePlannerScrollableSelector } from './usePlannerScrollableSelector';
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';

const selected = defineModel<number>() as ModelRef<number>;
const { items, keyAsValue, formatItem = (item: string | number, index: number) => item, colorTheme } = defineProps<{
  label: string
  items: (string|number)[]
  keyAsValue?: boolean
  colorTheme: Theme
  currentIndex: number
  btnSize: string
  formatItem?: (item: string | number, index: number) => string|number
}>();

const { itemRefs, formattedItems } = usePlannerScrollableSelector(selected, items, keyAsValue);
const { container, button, button_selected, text } = useCommonColorTheme(colorTheme, 'planner_scrollable');
</script>

<template>
  <div
    :class="[
      `flex h-30`,
      container
    ]"
  >
    <div
      :class="[
        'w-[80px] text-center font-semibold pt-2',
        text
      ]"
    >{{ label }}</div>
    <div
      class="flex w-full h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
    >
      <button
        v-for="{ item, index, value } in formattedItems"
        :key="item"
        :ref="el => el && (itemRefs[value] = (el as HTMLElement))"
        @click="selected = value"
        :class="[
          'text-base rounded-full shrink-0 snap-center cursor-pointer',
          btnSize,
          button,
          selected === value && button_selected,
        ]"
      >
        <span
          :class="[
            currentIndex === value && 'underline underline-offset-4'
          ]"
        >
          {{ formatItem(item, index) }}
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
