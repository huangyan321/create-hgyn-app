<template>
    <el-dialog
        v-model="show"
        class="form-dialog"
        :title="title"
        :width="width"
        :append-to-body="appendToBody"
        draggable
        @close="close"
    >
        <slot name="body"></slot>
        <slot name="footer"></slot>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = withDefaults(
    defineProps<{
        formShow?: boolean;
        title?: string;
        width?: string | number;
        appendToBody?: boolean;
    }>(),
    {
        formShow: false,
        title: '编辑信息',
        width: '65%',
        appendToBody: false,
    },
);
const show = ref(false);
watch(props, (n) => {
    show.value = n.formShow;
});
const emit = defineEmits(['close']);
const close = () => {
    emit('close');
};
</script>
