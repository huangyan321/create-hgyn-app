<template>
    <el-popover
        v-for="item in props.extendArray"
        :key="item.id"
        placement="bottom"
        :width="500"
        trigger="click"
    >
        <template #reference>
            <div class="hover column justify-center items-center pa-md mr-md">
                <el-icon size="20px">
                    <component :is="item.icon" />
                </el-icon>
                <span
                    class="mt-sm text-nowrap text-hidden size-base text-bold"
                    >{{ item.title }}</span
                >
            </div>
        </template>
        <el-input
            v-if="item.id !== '2'"
            v-model="item.msg"
            readonly
            size="large"
        >
            <template #suffix>
                <el-icon><Calendar /></el-icon>
            </template>
            <template #prefix>
                <el-icon><Search /></el-icon>
            </template>
        </el-input>
        <el-card v-else class="box-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <span>消息中心</span>
                </div>
            </template>
            <div
                v-for="o in props.msgArray"
                :key="o.id"
                class="card-item pa-sm"
            >
                <span>{{ o.title }}</span
                ><span>{{ o.date }}</span>
            </div>
            <div class="full-width row justify-center items-center hover">
                查看更多消息...
            </div>
        </el-card>
    </el-popover>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
interface extendType {
    id: string;
    title: string;
    icon: string;
    suffix?: string;
    msg?: string;
}
interface msgType {
    id: string;
    title: string;
    date: string;
}
const props = defineProps({
    extendArray: {
        type: Array as PropType<extendType[]>,
        default: () => [],
    },
    msgArray: {
        type: Array as PropType<msgType[]>,
        default: () => [],
    },
});
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
}
.card-item {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
}

.box-card {
    width: 480px;
    border: none;
}
</style>
