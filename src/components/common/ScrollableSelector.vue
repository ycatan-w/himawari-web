<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, watch, type ModelRef } from 'vue';
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';

const selected = defineModel<number>();
const {
  items,
  keyAsValue,
  formatItem = (item: string | number, index: number) => item,
  colorTheme,
} = defineProps<{
  label: string;
  items: (string | number)[];
  keyAsValue?: boolean;
  colorTheme: Theme;
  currentIndex: number;
  btnSize: string;
  formatItem?: (item: string | number, index: number) => string | number;
}>();
const { container, button, button_selected, text } = useCommonColorTheme(
  colorTheme,
  'scrollable_selector',
);

const itemRefs: Record<number, HTMLElement> = reactive({});
const formattedItems = computed(() =>
  items.map((item, index) => ({
    item,
    index,
    value: keyAsValue ? index : (item as number),
  })),
);

const scrollToSelected = () => {
  nextTick(() => {
    const el = itemRefs[selected.value as number];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
};

onMounted(scrollToSelected);
watch(selected, scrollToSelected);
</script>

<template>
  <div :class="[`flex h-30`, container]">
    <div :class="['w-[80px] text-center font-semibold pt-2', text]">{{ label }}</div>
    <div class="flex w-full h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      <button
        v-for="{ item, index, value } in formattedItems"
        :key="item"
        :ref="(el) => el && (itemRefs[value] = el as HTMLElement)"
        @click="selected = value"
        :class="[
          'text-base w-50 rounded-2xl shrink-0 snap-center cursor-pointer hover:opacity-40',
          btnSize,
          button,
          selected === value && `${button_selected} opacity-50`,
        ]"
      >
        <span :class="[currentIndex === value && 'underline underline-offset-4']">
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
