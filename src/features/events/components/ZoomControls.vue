<script setup lang="ts">
import { IconRefresh, IconZoomIn, IconZoomOut } from '@/components/icons';
import ZoomControlButton from './ZoomControlButton.vue';

const scaleFactorRef = defineModel<number>({ default: 1 });
function resetZoomAction() {
  scaleFactorRef.value = 1;
}
function zoomInAction() {
  scaleFactorRef.value = Math.min(scaleFactorRef.value + 0.25, 24);
}
function zoomOutAction() {
  scaleFactorRef.value = Math.max(scaleFactorRef.value - 0.25, 1);
}
</script>

<template>
  <ZoomControlButton :onClick="zoomInAction">
    <IconZoomIn />
  </ZoomControlButton>
  <!-- <span>{{ scaleFactorRef * 100 }}%</span> -->
  <ZoomControlButton :onClick="zoomOutAction">
    <IconZoomOut />
  </ZoomControlButton>
  <ZoomControlButton :onClick="resetZoomAction">
    <IconRefresh />
  </ZoomControlButton>
</template>
