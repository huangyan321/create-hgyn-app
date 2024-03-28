<template>
    <div
        v-show="!isCollapse"
        class="full-width text-bold size-md bg-white row justify-center items-center no-wrap text-animation aside-title"
    >
        设备运营平台
    </div>
    <el-scrollbar style="background: #191a20" :view-style="{ width: '211px' }">
        <el-menu
            :default-active="defaultActive"
            class="menu-height"
            :collapse="isCollapse"
            :unique-opened="true"
            background-color="#191a20"
            text-color="#bdbdc0"
            active-text-color="#ffffff"
        >
            <template v-for="item in publicStore.asyncRoute" :key="item.id">
                <el-menu-item
                    v-show="!item.children || item.children.length === 0"
                    :index="String(item.id)"
                    @click="handleClick"
                >
                    <el-icon size="24px"><component :is="item.icon" /></el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
                <el-sub-menu
                    v-show="item.children && item.children.length"
                    :index="String(item.id)"
                >
                    <template #title>
                        <el-icon size="24px">
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item-group>
                        <template #title>
                            <span></span>
                        </template>
                        <el-menu-item
                            v-for="items in item.children"
                            :key="item.id + '-' + items.id"
                            :index="item.id + '-' + items.id"
                            @click="handleClick"
                            >{{ items.name }}</el-menu-item
                        >
                    </el-menu-item-group>
                </el-sub-menu>
            </template>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { usePublicStore } from '@/store/modules/public';
import router from '@/router';
import usePublic from '@/hooks/usePublic.hook';
const { routeTo, notify } = usePublic();
const publicStore = usePublicStore();
const isCollapse = computed(() => {
    return publicStore.isCollapse;
});
const defaultActive = ref('0');
let str = '';
const checkRouter = () => {
    publicStore.asyncRoute.map((item) => {
        // 一级路由匹配
        if (
            item.url === publicStore.currentRoute.path &&
            item.children.length === 0
        ) {
            defaultActive.value = String(item.id);
            return;
        }
        // 二级路由匹配
        if (item.children.length) {
            str = String(item.id) + '-';
            item.children.map((items) => {
                if (items.url === publicStore.currentRoute.path) {
                    str += String(items.id);
                    defaultActive.value = str;
                    return;
                }
            });
        }
    });
};

const handleSelect = (index: string, indexPath: Array<string>) => {
    if (!indexPath.length) {
        return;
    }
    if (indexPath.length === 1) {
        const url = publicStore.asyncRoute.filter(
            (item: RouteTreeType) => item.id === Number(index),
        )[0]?.url;
        if (!url) {
            notify('error', '路径有误!');
        }
        routeTo(url);
    } else {
        let url = '/';
        const array = index.split('-');
        const f = Number(array[0]);
        const s = Number(array[1]);
        const t = Number(array[2]);
        const list_f = publicStore.asyncRoute.filter(
            (item: RouteTreeType) => item.id === f,
        );
        url = list_f[0]?.url;
        // 存在二级
        if (s && list_f[0]) {
            const list_s = list_f[0].children.filter(
                (item: RouteTreeType) => item.id === s,
            );
            url = list_s[0]?.url;
            // 存在三级
            if (t && list_s[0]) {
                const list_t = list_s[0].children.filter(
                    (item: RouteTreeType) => item.id === t,
                );
                url = list_t[0]?.url;
            }
        }
        routeTo(url);
    }
};
const handleClick = (e: { index: string; indexPath: [] }) => {
    handleSelect(e.index, e.indexPath);
};
checkRouter();
watch(
    () => router.currentRoute.value.path,
    (n) => {
        checkRouter();
    },
    { immediate: true },
);
</script>

<style scoped lang="scss">
.menu-height {
    height: calc(100% - 50px);
}
:deep(.el-menu-item-group__title) {
    display: none;
}
.text-animation {
    transition: all 0.28s linear;
}
.aside-title {
    height: 50px;
    background: #191a20;
    color: #bdbdc0;
    border-bottom: 1px solid #282a35;
}
</style>
