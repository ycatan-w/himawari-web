<script setup lang="ts">
import { reactive, ref, toRef, watch } from 'vue';
import TimePicker from '@/components/ui/form/TimePicker.vue';
import { FloatingInputStandard } from '@/components/ui/input';
import { IconCancel, IconDelete, IconClock } from '@/components/ui/icons';
import type { EventData } from '@/modules/providers/base-provider';
import { useEventForm } from './useEventForm';
import BaseModal from '@/components/common/BaseModal.vue';

const selectedEventId = defineModel<number>('selectedEventId', {default: 0});
const draftStart = defineModel<number | null>('draftStart', {default: null})

const props = defineProps<{
  date: Date
  themeColors: string,
  rawEvents: EventData[]
}>();
const { form, isEdition, addAction, editAction, deleteAction } = useEventForm(props.date, selectedEventId, toRef(props, 'rawEvents'), draftStart);
const confirmDeleteOpen = ref(false);
</script>

<template>
  <BaseModal
    v-model:open="confirmDeleteOpen"
    :title="$t('modal.delete.title')"
    :message="$t('modal.delete.message')"
    :confirm-text="$t('modal.delete.delete')"
    :cancel-text="$t('modal.delete.cancel')"
    @confirm="deleteAction(selectedEventId)"
    :themeColors="themeColors"
  />
  <form :class="['e-form', `e-form-${themeColors}`]">
    <div class="flex items-center gap-1">
      <h2 :class="['e-form-title', `e-form-title-${themeColors}`]">
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
            <TimePicker v-model="form.start" :theme-colors="themeColors" />
            &nbsp;-&nbsp;
            <TimePicker v-model="form.end" :theme-colors="themeColors" />
          </div>
        </div>

        <FloatingInputStandard
          v-model="form.title"
          id="title"
          type="text"
          :color-scheme="themeColors"
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
            :class="`fi-textarea-standard fi-textarea-standard-${themeColors} peer`"
            placeholder=" "
          ></textarea>
          <label for="description" :class="`fi-textarea-label-standard fi-textarea-label-standard-${themeColors}`">{{ $t('label.event_description') }}</label>
        </div>
      </div>
    </div>

      <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:gap-3 w-full sm:w-auto">
          <button
            v-if="isEdition()"
            type="button"
            @click="selectedEventId = 0"
            class="text-sm font-medium text-white inline-flex items-right text-center
                  underline-offset-4 hover:underline transition-colors sm:self-center cursor-pointer"
          >
            <IconCancel /> <span class="ms-1">{{ $t('button.event_cancel') }}</span>
          </button>
          <button
            type="submit"
            @click.prevent="(isEdition()) ? editAction(selectedEventId) : addAction()"
            :class="[
              'e-form-btn',
              `e-form-btn-${themeColors}`
            ]"
          >
            {{ $t('button.event_save') }}
          </button>
        </div>
      </div>
  </form>
</template>
