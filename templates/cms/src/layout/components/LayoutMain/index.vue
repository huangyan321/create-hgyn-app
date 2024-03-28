<template>
    <div ref="screenRef" class="full-width full-height">
        <div v-show="showWarn" id="warnMsg">{{ warnMsg }}</div>
        <el-container>
            <el-aside class="aside" :width="isCollapse ? '54px' : '210px'">
                <Asides />
            </el-aside>
            <el-container>
                <el-header height="80px">
                    <Headers />
                </el-header>
                <el-main class="main">
                    <Container />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import Api from '@/api';
import Headers from '@/components/Headers/index.vue';
import Asides from '@/components/Asides/index.vue';
import Container from '@/components/Container/index.vue';
import { usePublicStore } from '@/store/modules/public';
const publicStore = usePublicStore();
const isCollapse = computed(() => {
    return publicStore.isCollapse;
});
const showWarn = ref(false);
const warnMsg = ref('');
</script>
<style scoped lang="scss">
.aside {
    transition: width 0.28s;
    min-height: 99vh;
    z-index: 1001;
    overflow: hidden;
}
.main {
    padding-top: 0;
    padding-right: 10px;
}
.el-header {
    padding-right: 10px !important;
}
#warnMsg {
    width: 92%;
    height: 68px;
    background-color: #c8292c;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    z-index: 999;
}
</style>
