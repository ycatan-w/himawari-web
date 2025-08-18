import { reactive, toValue, watch, type ModelRef, type Ref } from "vue";
import type { EventData } from "@/modules/providers/base-provider";
import { getProvider } from '@/modules/providers'

export function useEventForm(date: Date, selectedEventId: ModelRef<number>, rawEvents: Ref<EventData[]>, draftStart: Ref<number | null>) {
  const provider = getProvider();
  const errors = reactive({
    title: false,
    date: false
  });
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
  }

  function minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(h)}:${pad(m)}`
  }
  function timeToMinutes(time: string) {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + (m ?? 0);
  }
  const isEdition = () => toValue(selectedEventId) !== 0;
  async function deleteAction(eventId: number) {
    const eventIndex = toValue(rawEvents).findIndex(event => event.id === eventId);
    if (eventIndex < 0) {
      // event not found
      return ;
    }
    await provider.deleteEvent(eventId);
    resetForm();
    rawEvents.value.splice(eventIndex, 1);
    selectedEventId.value = 0;
  }
  async function editAction(eventId: number) {
    const eventIndex = toValue(rawEvents).findIndex(event => event.id === eventId);
    if (eventIndex < 0) {
      // event not found
      return ;
    }
    errors.date = false;
    const startMin = timeToMinutes(form.start);
    const endMin = timeToMinutes(form.end);
    if (endMin <= startMin) {
      errors.date = true;
      return ;
    }
    const editedEvent = {
      id: eventId,
      start: startMin,
      end: endMin,
      title: form.title,
      description: form.description,
      date: date.toISOString()
    };
    await provider.updateEvent(editedEvent);
    rawEvents.value[eventIndex] = editedEvent;
    resetForm();
    selectedEventId.value = 0;
  }
  async function addAction() {
    errors.date = false;
    const startMin = timeToMinutes(form.start);
    const endMin = timeToMinutes(form.end);
    console.log(startMin, endMin);
    if (endMin <= startMin) {
      errors.date = true;
      return ;
    }
    const createdEvent = await provider.addEvent({
      start: startMin,
      end: endMin,
      title: form.title,
      description: form.description,
      date: date.toISOString()
    });
    draftStart.value = null;
    rawEvents.value.push({ ...createdEvent });
    resetForm();
  }

  watch(() => toValue(selectedEventId), () => {
   resetForm();

    if (!isEdition()) {
      return ;
    }
    const event = toValue(rawEvents).find(event => event.id === toValue(selectedEventId));
    if (!event) {
      return ;
    }
    draftStart.value = null;
    form.start = minutesToTime(event.start);
    form.end = minutesToTime(event.end);
    form.title = event.title;
    form.description = event.description;
  });

  watch(() => toValue(draftStart), (val) => {
    if (val !== null) {
      form.start = minutesToTime(val);
      form.end = minutesToTime(val + 30);
    }
  })

  return { form, isEdition, addAction, editAction, deleteAction };
}