import { IconZoomIn, IconZoomOut } from "@/components/ui/icons";
import type { Ref } from "vue";

export function useZoomButton(scaleFactorRef: Ref<number>) {
  const zoomDetails = [
    {
      icon: IconZoomIn,
      action: () => {
        scaleFactorRef.value = Math.min(scaleFactorRef.value + 0.25, 24);
      },
    },
    {
      icon: IconZoomOut,
      action: () => {
        scaleFactorRef.value = Math.max(scaleFactorRef.value - 0.25, 1);
      },
    }
  ];

  return { zoomDetails };
}
