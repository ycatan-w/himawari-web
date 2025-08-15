import { computed, nextTick, onMounted, reactive, watch, type ModelRef } from "vue";

export function usePlannerScrollableSelector(selected: ModelRef<number>, items: (string|number)[], keyAsValue: boolean) {
  const itemRefs: Record<number, HTMLElement> = reactive({});
  const formattedItems = computed(() =>
    items.map((item, index) => ({
      item,
      index,
      value: keyAsValue ? index : (item as number)
    }))
  );

  const scrollToSelected = () => {
    nextTick(() => {
      const el = itemRefs[(selected.value as number)]
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  };

  onMounted(scrollToSelected);
  watch(selected, scrollToSelected);

  return { itemRefs, formattedItems };
}
