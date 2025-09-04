import { onUnmounted, ref, watch } from 'vue';

export function useDateNavigator() {
  const showOverview = ref(false);

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      showOverview.value = false;
    }
  };

  watch(showOverview, (isShown) => {
    if (isShown) {
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('keydown', handleKeydown);
    }
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  return { showOverview };
}
