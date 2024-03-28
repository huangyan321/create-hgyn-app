<template>
    <div class="reload"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import router from '@/router';
// 重新加载前路径页面
onMounted(() => {
    router.go(-1);
});
</script>

<style lang="scss" scoped>
.reload {
    height: 100vh;
    width: 100vw;
}
</style>
