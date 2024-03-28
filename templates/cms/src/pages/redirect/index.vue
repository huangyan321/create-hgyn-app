<template>
    <el-button size="small" @click="goHome">返回主页</el-button>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
    router.replace({ path: '/' });
};
</script>
