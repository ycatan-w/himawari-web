<script setup lang="ts">
import { useCommonColorTheme, useFeatureColorTheme } from '@/utils/colorTheme';
import { useZoomButton } from './useZoomButton';

const scaleFactorRef = defineModel<number>({default: 1});
const { zoomDetails } = useZoomButton(scaleFactorRef);
const { featureColorTheme } = useFeatureColorTheme('overview');
</script>

<template>
    <button
      v-for="(zoomDetail, index) in zoomDetails"
      :key="index"
      @click="zoomDetail.action"
      :class="[
        'px-4 py-2 ml-3 cursor-pointer',
        featureColorTheme.button_zoom
      ]"
    >
      <component :is="zoomDetail.icon" />
    </button>
</template>