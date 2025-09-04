import { reactive, ref, toValue, watch, type ModelRef, type Ref } from 'vue';
import type { EventData } from '@/modules/providers/base-provider';
import { getProvider } from '@/modules/providers';
import { minutesToTime, timeToMinutes } from '@/utils/timeHelper';
import { APIException } from '@/modules/providers/api-provider';
import { useTranslator } from '@/utils/translation';

export function useEventForm(
  date: string,
  selectedEventId: ModelRef<number>,
  rawEvents: Ref<EventData[]>,
  draftStart: Ref<number | null>,
) {
  const provider = getProvider();
  const { translateErrorApi } = useTranslator();
  const form = reactive({
    start: '',
    end: '',
    title: '',
    description: '',
  });
  function resetForm() {
    form.start = '00:00';
    form.end = '00:00';
    form.title = '';
    form.description = '';
    resetErrors();
  }
  const selectedEvent = ref<any>(null);
  const isEdition = () => toValue(selectedEventId) !== 0;
  const titleErrors = ref<string[]>([]);
  const descriptionErrors = ref<string[]>([]);
  const timeErrors = ref<string[]>([]);
  const resetErrors = () => {
    titleErrors.value = [];
    descriptionErrors.value = [];
    timeErrors.value = [];
  };

  const onResetClick = () => {
    if (isEdition()) {
      selectedEventId.value = 0;
      return;
    }
    draftStart.value = null;
    resetForm();
  };

  async function deleteAction(eventId: number) {
    const eventIndex = toValue(rawEvents).findIndex((event) => event.id === eventId);
    if (eventIndex < 0) {
      // event not found
      return;
    }
    await provider.deleteEvent(eventId);
    resetForm();
    rawEvents.value.splice(eventIndex, 1);
    selectedEventId.value = 0;
  }
  async function editAction(eventId: number) {
    resetErrors();
    const eventIndex = toValue(rawEvents).findIndex((event) => event.id === eventId);
    if (eventIndex < 0) {
      return;
    }
    const startMin = timeToMinutes(form.start);
    const endMin = timeToMinutes(form.end);
    if (endMin <= startMin) {
      timeErrors.value.push(
        translateErrorApi('events', {
          field: 'start',
          code: 'INVALID_TIME_RANGE',
          details: 'Start cannot be after End',
        }),
      );
      return;
    }
    const editedEvent = {
      id: eventId,
      start: startMin,
      end: endMin,
      title: form.title,
      description: form.description,
      date: date,
    };
    provider
      .updateEvent(editedEvent)
      .then((editedEvent) => {
        rawEvents.value[eventIndex] = editedEvent;
        resetForm();
        selectedEventId.value = 0;
      })
      .catch((err) => {
        if (err instanceof APIException) {
          err.errors.forEach((e) => {
            switch (e.field) {
              case 'title':
                titleErrors.value.push(translateErrorApi('events', e));
                break;
              case 'description':
                descriptionErrors.value.push(translateErrorApi('events', e));
            }
          });
        }
      });
  }
  async function addAction() {
    resetErrors();
    const startMin = timeToMinutes(form.start);
    const endMin = timeToMinutes(form.end);
    if (endMin <= startMin) {
      timeErrors.value.push(
        translateErrorApi('events', {
          field: 'start',
          code: 'INVALID_TIME_RANGE',
          details: 'Start cannot be after End',
        }),
      );
      return;
    }
    provider
      .addEvent({
        start: startMin,
        end: endMin,
        title: form.title,
        description: form.description,
        date: date,
      })
      .then((createdEvent) => {
        draftStart.value = null;
        rawEvents.value.push({ ...createdEvent });
        resetForm();
      })
      .catch((err) => {
        if (err instanceof APIException) {
          err.errors.forEach((e) => {
            switch (e.field) {
              case 'title':
                titleErrors.value.push(translateErrorApi('events', e));
                break;
              case 'description':
                descriptionErrors.value.push(translateErrorApi('events', e));
            }
          });
        }
      });
  }

  watch(
    () => toValue(selectedEventId),
    () => {
      resetForm();
      selectedEvent.value = null;

      if (!isEdition()) {
        return;
      }
      const event = toValue(rawEvents).find((event) => event.id === toValue(selectedEventId));
      if (!event) {
        return;
      }
      selectedEvent.value = event;
      draftStart.value = null;
      form.start = minutesToTime(event.start);
      form.end = minutesToTime(event.end);
      form.title = event.title;
      form.description = event.description;
    },
  );

  watch(
    () => toValue(draftStart),
    (val) => {
      if (val !== null) {
        form.start = minutesToTime(val);
        form.end = minutesToTime(val + 30);
      } else if (!toValue(selectedEventId)) {
        resetForm();
      }
    },
  );

  return {
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
  };
}
