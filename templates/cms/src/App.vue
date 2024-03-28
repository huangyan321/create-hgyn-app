<script lang="ts" setup>
import windowResize from '@/utils/resize';
import { onMounted, onUnmounted } from 'vue';
import { useLocaleStore } from './store/modules/locale';
import { useI18n } from 'vue-i18n';
const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize();
onMounted(() => {
    // 监听浏览器窗口尺寸变化
    windowDraw();
    calcRate();
});

onUnmounted(() => {
    unWindowDraw();
});

const localeStore = useLocaleStore();
const { locale } = useI18n();
locale.value = localeStore.currentLocale || 'zh-CN'; // 默认中文
</script>
<template>
    <div ref="screenRef" class="full-width full-height">
        <RouterView></RouterView>
    </div>
</template>
<style scoped lang="scss"></style>
