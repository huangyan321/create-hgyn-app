<template>
    <div class="card table-search">
        <el-form
            ref="formRef"
            :inline="true"
            :model="searchParam"
            label-width="80"
        >
            <el-form-item
                v-for="(item, index) in columns"
                :key="item.prop"
                v-bind="getResponsive(item)"
                :index="index"
                class="form-item"
            >
                <SearchFormItem
                    :column="item"
                    :search-param="searchParam"
                    @val-change="valChange"
                />
            </el-form-item>
            <el-form-item class="operation row justify-end">
                <el-button
                    v-if="columns.length"
                    v-auth:[tab]="'SEARCH'"
                    type="primary"
                    size="default"
                    icon="Search"
                    @click="search"
                    >搜索</el-button
                >
                <el-button
                    v-if="columns.length"
                    v-auth:[tab]="'RESET'"
                    icon="Refresh"
                    size="default"
                    @click="reset"
                    >重置</el-button
                >
                <el-button
                    v-if="searchShow?.add!"
                    v-auth:[tab]="'ADD'"
                    type="primary"
                    size="default"
                    @click="add"
                    >新增</el-button
                >
                <el-button
                    v-if="searchShow?.backup!"
                    v-auth:[tab]="'BACK_UP'"
                    type="primary"
                    size="default"
                    @click="backup"
                    >备份</el-button
                >
                <el-button
                    v-if="searchShow?.back!"
                    type="primary"
                    size="default"
                    @click="toBack"
                    >返回</el-button
                >
                <el-button
                    v-for="(btn, btnIndex) in searchShow.diy"
                    :key="btnIndex"
                    v-auth:[tab]="btn.auth || ''"
                    :type="btn.type || 'primary'"
                    size="default"
                    @click="btn.click"
                    >{{ btn.text }}</el-button
                >
                <el-button
                    v-if="showCollapse"
                    type="primary"
                    link
                    class="search-isOpen"
                    @click="collapsed = !collapsed"
                >
                    {{ collapsed ? '展开' : '合并' }}
                    <el-icon class="el-icon--right">
                        <component
                            :is="collapsed ? ArrowDown : ArrowUp"
                        ></component>
                    </el-icon>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts" name="SearchForm">
import { BreakPoint } from '@/components/Grid/interface';
import { ColumnProps, SearchShowProps } from '@/components/ProTable/interface';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import SearchFormItem from './components/SearchFormItem.vue';
// import Grid from '@/components/Grid/index.vue';
// import GridItem from '@/components/Grid/components/GridItem.vue';
interface ProTableProps {
    columns?: ColumnProps[]; // 搜索配置列
    searchParam?: { [key: string]: any }; // 搜索参数
    searchCol: number | Record<BreakPoint, number>;
    search: (params: any) => void; // 搜索方法
    reset: (params: any) => void; // 重置方法
    add?: (params: any) => void; // 新增方法
    backup?: (params: any) => void; // 特殊备份按钮方法
    toBack?: (params: any) => void; // 返回方法
    searchShow?: Partial<SearchShowProps>;
    tab?: string;
}
// Emits
interface IEmits {
    (event: 'valChange', val: any, column: any): void;
}
const emits = defineEmits<IEmits>();
// 数值改变
const valChange = (val: any, column: any) => {
    emits('valChange', val, column);
};
// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    searchParam: () => ({}),
    add: () => ({}),
    backup: () => ({}),
    toBack: () => ({}),
    searchShow: () => ({
        add: false,
        search: false,
        reset: false,
        backup: false,
        back: false,
    }),
    tab: '',
});

// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
    return {
        span: item.search?.span,
        offset: item.search?.offset ?? 0,
        xs: item.search?.xs,
        sm: item.search?.sm,
        md: item.search?.md,
        lg: item.search?.lg,
        xl: item.search?.xl,
    };
};

// 是否默认折叠搜索项
const collapsed = ref(true);

// 获取响应式断点
const gridRef = ref();
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
    let show = false;
    props.columns.reduce((prev, current) => {
        prev +=
            (current.search![breakPoint.value]?.span ??
                current.search?.span ??
                1) +
            (current.search![breakPoint.value]?.offset ??
                current.search?.offset ??
                0);
        if (typeof props.searchCol !== 'number') {
            if (prev >= props.searchCol[breakPoint.value]) show = true;
        } else {
            if (prev > props.searchCol) show = true;
        }
        return prev;
    }, 0);
    return show;
});
</script>
