<template>
    <div
        class="full-width full-height column no-wrap justify-center items-center"
    >
        <el-image class="notFound" :src="notFound" fit="contain" />
        <p class="text-center">opps!似乎出错了~</p>
        <a href="/">点我返回主页</a>
    </div>
</template>

<script lang="ts" setup>
import notFound from '@/assets/usual/empty.png';
</script>

<style scoped lang="scss">
.notFound {
    width: 700px;
}
</style>
