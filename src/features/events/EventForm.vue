<script setup lang="ts">
import { reactive, ref, toRef, watch } from 'vue';
import TimePicker from '@/components/ui/form/TimePicker.vue';
import { FloatingInputStandard } from '@/components/ui/input';
import { IconCancel, IconDelete, IconClock } from '@/components/ui/icons';
import type { EventData } from '@/modules/providers/base-provider';
import { useEventForm } from './useEventForm';
import BaseModal from '@/components/common/BaseModal.vue';
import { useCommonColorTheme, useFeatureColorTheme } from '@/utils/colorTheme';

const selectedEventId = defineModel<number>('selectedEventId', {default: 0});
const draftStart = defineModel<number | null>('draftStart', {default: null})

const props = defineProps<{
  date: Date
  rawEvents: EventData[]
}>();
const { form, isEdition, addAction, editAction, deleteAction } = useEventForm(props.date, selectedEventId, toRef(props, 'rawEvents'), draftStart);
const confirmDeleteOpen = ref(false);
const { colorPalette, featureColorTheme } = useFeatureColorTheme('overview');
const formColor = useCommonColorTheme(colorPalette, 'form');
</script>

<template>
  <BaseModal
    v-model:open="confirmDeleteOpen"
    :title="$t('modal.delete.title')"
    :message="$t('modal.delete.message')"
    :confirm-text="$t('modal.delete.delete')"
    :cancel-text="$t('modal.delete.cancel')"
    @confirm="deleteAction(selectedEventId)"
    :themeColors="colorPalette"
  />
  <form class="relative w-full rounded-b shadow p-4 space-y-6">
    <div class="flex items-center gap-1">
      <h2 class="text-xl font-semibold relative border-l-4 pl-2">
        {{ isEdition() ? $t('label.edit_event') : $t('label.new_event') }}
      </h2>

      <button
        v-if="isEdition()"
        type="button"
        @click="() => { if (isEdition()) {confirmDeleteOpen = true} }"
        class="pl-2 cursor-pointer"
        :title="$t('button.event_delete')"
      >
        <IconDelete />
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center gap-2">
          <div class="relative w-full md:w-1/3">
            <div class="inline-flex items-center font-bold capitalize text-xs sm:text-sm lg:text-lg">
              <span class="mr-3"><IconClock /></span>
              {{ $d(date, {dateStyle: 'full'}) }}
            </div>
          </div>
          <div class="relative w-full md:w-2/3 ml-3 md:ml-0">
            <TimePicker v-model="form.start" :theme-colors="colorPalette" />
            &nbsp;-&nbsp;
            <TimePicker v-model="form.end" :theme-colors="colorPalette" />
          </div>
        </div>

        <FloatingInputStandard
          v-model="form.title"
          id="title"
          type="text"
          :color-scheme="colorPalette"
          :label="$t('label.event_title')"
          autocomplete="off"
          required
        />
      </div>

      <div class="space-y-4">
        <div class="relative h-full z-10">
          <textarea
            v-model="form.description"
            id="description"
            name="description"
            rows="3"
            :class="[
              'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 resize-none h-full peer',
              formColor.input_standard,
            ]"
            placeholder=" "
          ></textarea>
          <label
            for="description"
            :class="[
              'absolute text-xl duration-300 transform -translate-y-3 scale-75 top-0 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer',
              formColor.label_standard,
            ]"
          >
            {{ $t('label.event_description') }}
          </label>
        </div>
      </div>
    </div>

      <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:gap-3 w-full sm:w-auto">
          <button
            v-if="isEdition()"
            type="button"
            @click="selectedEventId = 0"
            class="text-sm font-medium text-white inline-flex items-right text-center underline-offset-4 hover:underline transition-colors sm:self-center cursor-pointer"
          >
            <IconCancel /> <span class="ms-1">{{ $t('button.event_cancel') }}</span>
          </button>
          <button
            type="submit"
            @click.prevent="(isEdition()) ? editAction(selectedEventId) : addAction()"
            :class="[
              'w-full sm:w-auto px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300 ease-out cursor-pointer',
              featureColorTheme.button,
            ]"
          >
            {{ $t('button.event_save') }}
          </button>
        </div>
      </div>
  </form>
</template>
