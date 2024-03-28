<template>
    <!-- 菜单切换 -->
    <el-menu-item
        v-for="item in props.menuArray"
        :key="item.id"
        :index="item.id"
        class="menu"
        ><el-icon size="20px"> <component :is="item.icon"></component> </el-icon
        >{{ item.title }}</el-menu-item
    >
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
interface menuType {
    id: string;
    title: string;
    icon: string;
}
const props = defineProps({
    menuArray: {
        type: Array as PropType<menuType[]>,
        default: () => [],
    },
});
</script>

<style scoped lang="scss">
.menu {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 3px;
}
</style>
