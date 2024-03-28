<template>
    <div
        class="icon-box overflow col-5 row wrap justify-start items-start overflow border"
    >
        <div
            v-for="item in iconList"
            :key="item"
            class="column justify-center items-center pa-sm hover-icon"
            :class="{ 'hover-icon-selected': selected === item }"
            @click="checkIcon(item)"
        >
            <el-icon size="18px">
                <component :is="item" />
            </el-icon>
        </div>
    </div>
</template>

<script lang="ts" setup name="iconList">
import { ref, watch } from 'vue';
import { iconList } from '@/utils/icon-list';
const selected = ref('');
const props = defineProps({
    selectIcon: { type: String, default: '' },
    dialogVisible: { type: Boolean, default: false },
});
const emits = defineEmits(['checkIcon']);
const checkIcon = (e: string) => {
    selected.value = e;
    emits('checkIcon', e);
};
// 赋值监听
watch(
    () => props.dialogVisible,
    (n) => {
        if (n) {
            const e = iconList.filter((item) => item === props.selectIcon)[0];
            selected.value = e || '';
        }
    },
    { immediate: true, deep: true },
);
</script>

<style lang="less" scoped>
.icon-box {
    height: 150px;
}
.icon-card {
    margin: 4px;
}
</style>
