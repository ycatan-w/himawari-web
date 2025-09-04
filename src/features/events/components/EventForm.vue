<script setup lang="ts">
import { ref, toRef } from 'vue';
import { useCommonColorTheme, useFeatureColorTheme } from '@/utils/colorTheme';
import type { EventData } from '@/modules/providers/base-provider';
import { IconCancel, IconDelete, IconClock, IconRefresh } from '@/components/icons';
import { FloatingInputStandard, SubmitButton } from '@/components/input';
import { ConfirmDeleteModal, TimePicker } from '@/components/common';
import { useEventForm } from '../composables/useEventForm';
import EventPreview from './EventPreview.vue';

const selectedEventId = defineModel<number>('selectedEventId', { default: 0 });
const draftStart = defineModel<number | null>('draftStart', { default: null });

const props = defineProps<{
  date: string;
  rawEvents: EventData[];
}>();
const {
  form,
  selectedEvent,
  titleErrors,
  descriptionErrors,
  timeErrors,
  isEdition,
  addAction,
  editAction,
  deleteAction,
  onResetClick,
} = useEventForm(props.date, selectedEventId, toRef(props, 'rawEvents'), draftStart);
const confirmDeleteOpen = ref(false);
const { colorPalette } = useFeatureColorTheme('overview');
const formColor = useCommonColorTheme(colorPalette, 'form');
function testAction() {
  console.log(form.title);
}
</script>

<template>
  <ConfirmDeleteModal
    v-model="confirmDeleteOpen"
    :title="$t('events.form.delete.title')"
    :message="$t('events.form.delete.message')"
    @confirm="deleteAction(selectedEventId)"
  >
    <EventPreview :event="selectedEvent" :color-palette="colorPalette" />
  </ConfirmDeleteModal>

  <form class="relative w-full rounded-b shadow mt-3 space-y-6">
    <div class="flex items-center gap-1">
      <h2 class="text-xl font-semibold relative border-l-4 pl-2">
        {{ isEdition() ? $t('events.form.update.title') : $t('events.form.create.title') }}
      </h2>

      <button
        v-if="isEdition()"
        type="button"
        @click="
          () => {
            if (isEdition()) {
              confirmDeleteOpen = true;
            }
          }
        "
        class="pl-2 cursor-pointer"
        :title="$t('events.form.delete.title')"
      >
        <IconDelete />
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center gap-2">
          <div class="relative w-full md:w-1/3">
            <div
              class="inline-flex items-center font-bold capitalize text-xs sm:text-sm lg:text-lg"
            >
              <span class="mr-3"><IconClock /></span>
              {{ $d(new Date(date), { dateStyle: 'full' }) }}
            </div>
          </div>
          <div class="relative w-full md:w-2/3 ml-3 md:ml-0">
            <TimePicker v-model="form.start" :theme-colors="colorPalette" />
            &nbsp;-&nbsp;
            <TimePicker v-model="form.end" :theme-colors="colorPalette" />
          </div>
        </div>
        <p v-if="timeErrors.length === 1" class="mt-2 text-sm text-white/80">
          {{ timeErrors[0] }}
        </p>

        <FloatingInputStandard
          v-model="form.title"
          id="title"
          type="text"
          :color-scheme="colorPalette"
          :label="$t('events.form.event.title')"
          :max-length="100"
          :error="titleErrors.length > 0"
          :error-msg="titleErrors"
          @input="testAction"
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
            {{ $t('events.form.event.description') }}
            <span
              :class="[
                `text-sm font-extrabold`,
                1000 - form.description.length < 0 && 'text-white/80',
              ]"
            >
              {{ 1000 - form.description.length }} / 1000
            </span>
          </label>
        </div>
        <p v-if="descriptionErrors.length === 1" class="mt-2 text-sm text-white/80">
          {{ descriptionErrors[0] }}
        </p>
        <div v-else-if="descriptionErrors.length > 1" class="mt-2">
          <ul class="list-inside list-[circle]">
            <li v-for="message in descriptionErrors" class="text-xs text-white/80">
              {{ message }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
      <div class="flex flex-col-reverse gap-4 sm:flex-row sm:gap-3 w-full sm:w-auto">
        <button
          type="button"
          @click="onResetClick"
          class="text-sm font-medium text-white/80 inline-flex items-right text-center underline-offset-4 hover:underline transition-colors sm:self-center cursor-pointer"
        >
          <IconCancel v-if="isEdition()" />
          <span class="ms-1" v-if="isEdition()">{{ $t('events.form.button.cancel') }}</span>
          <IconRefresh v-if="!isEdition()" />
          <span class="ms-1" v-if="!isEdition()">{{ $t('events.form.button.reset') }}</span>
        </button>
        <SubmitButton
          @click.prevent="isEdition() ? editAction(selectedEventId) : addAction()"
          class="px-15"
        >
          {{ $t('events.form.button.save') }}
        </SubmitButton>
      </div>
    </div>
  </form>
</template>
