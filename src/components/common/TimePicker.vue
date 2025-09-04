<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { TimePickerSpinner } from '@/components/common';
import { useCommonColorTheme, type Theme } from '@/utils/colorTheme';

const props = defineProps<{
  modelValue: string;
  themeColors: Theme;
}>();
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const pickerRef = ref<HTMLElement | null>(null);
const toggleButtonRef = ref<HTMLElement | null>(null);
const selected = ref({ hour: 0, minute: 0 });
const hour = ref(0);
const minute = ref(0);

const displayTime = computed(
  () =>
    `${selected.value.hour.toString().padStart(2, '0')}:${selected.value.minute.toString().padStart(2, '0')}`,
);

const confirm = () => {
  selected.value = { hour: hour.value, minute: minute.value };
  emit(
    'update:modelValue',
    `${selected.value.hour.toString().padStart(2, '0')}:${selected.value.minute.toString().padStart(2, '0')}`,
  );
  cancel();
};
const cancel = () => {
  isOpen.value = false;
};
const open = () => {
  if (isOpen.value) {
    cancel();
    return;
  }
  isOpen.value = true;
  hour.value = selected.value.hour;
  minute.value = selected.value.minute;
};
const onClickOutside = (e: MouseEvent) => {
  const target = e.target as Node;

  const clickedOutside =
    pickerRef.value &&
    !pickerRef.value.contains(target) &&
    toggleButtonRef.value &&
    !toggleButtonRef.value.contains(target);

  if (isOpen.value && clickedOutside) {
    cancel();
  }
};

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const [h, m] = val.split(':').map(Number);
      hour.value = h;
      minute.value = m;
      selected.value = { hour: h, minute: m };
    }
  },
  { immediate: true },
);

onMounted(() => document.addEventListener('click', onClickOutside));

onBeforeUnmount(() => document.removeEventListener('click', onClickOutside));
const timepickerColor = useCommonColorTheme(props.themeColors, 'timepicker');
</script>

<template>
  <div class="relative inline-block">
    <button
      @click="open"
      ref="toggleButtonRef"
      type="button"
      :class="[
        'px-4 py-2 text-xs md:text-lg cursor-pointer hover:text-white/70',
        timepickerColor.button,
      ]"
    >
      {{ displayTime }}
    </button>

    <div
      v-if="isOpen"
      ref="pickerRef"
      :class="['absolute z-55 border rounded shadow-lg p-3 w-45', timepickerColor.dropdown]"
    >
      <div class="flex items-center justify-center">
        <TimePickerSpinner v-model="hour" :min="0" :max="23" />
        <div class="px-2 text-xl font-bold select-none">:</div>
        <TimePickerSpinner v-model="minute" :min="0" :max="59" />
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <button
          @click="cancel"
          type="button"
          class="text-sm text-white/80 hover:underline cursor-pointer"
        >
          {{ $t('common.button.cancel') }}
        </button>
        <button
          @click="confirm"
          type="button"
          :class="[`px-3 py-1 text-sm rounded cursor-pointer`, timepickerColor.confirm]"
        >
          {{ $t('common.button.confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>
