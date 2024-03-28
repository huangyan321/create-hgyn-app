<template>
    <div class="empty-box full-width row justify-center items-center">
        <el-image style="width: 300px" :src="empty" fit="cover"> </el-image>
    </div>
</template>

<script lang="ts" setup>
import empty from '@/assets/usual/empty.png';
</script>

<style lang="less" scoped>
.empty-box {
    height: 300px;
}
</style>
