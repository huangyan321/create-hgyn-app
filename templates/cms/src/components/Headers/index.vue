<!-- 顶部组件 -->
<template>
    <el-menu
        :default-active="activeIndex"
        class="full-width"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <div class="row justify-start items-center pa-md hover">
            <el-icon size="18px" @click="handleExpand"
                ><Expand v-show="!hasExpand" /><Fold v-show="hasExpand"
            /></el-icon>
        </div>
        <div class="row justify-start items-center pa-md">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-show="menu_1" :to="{ path: path_1 }">{{
                    menu_1
                }}</el-breadcrumb-item>
                <el-breadcrumb-item v-show="menu_2">{{
                    menu_2
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="flex-grow" />
        <!-- 个人信息 -->
        <AvatarPanel />
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import AvatarPanel from './components/AvatarPanel.vue';
import { usePublicStore } from '@/store/modules/public';
import { ArrowRight } from '@element-plus/icons-vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useRouter } from 'vue-router';
const { currentRoute } = useRouter();
const publicStore = usePublicStore();
const activeIndex = ref('0');
const hasExpand = computed(() => {
    return publicStore.isCollapse;
});
const menu_1: any = ref('首页');
const menu_2: any = ref('');
const path_1 = ref('');
watch(
    () => currentRoute.value,
    (route: RouteLocationNormalizedLoaded) => {
        menu_1.value = route.matched[1]?.meta.title || '';
        menu_2.value = route.matched[2]?.meta.title || '';
    },
    { immediate: true },
);
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};
const handleExpand = () => {
    publicStore.updateIsCollapse(!hasExpand.value);
};
</script>

<style scoped lang="scss"></style>
