<template>
    <!-- 查询表单 card -->
    <ProSearch
        v-show="isShowSearch"
        :search="search"
        :reset="reset"
        :add="add"
        :backup="backup"
        :to-back="back"
        :search-param="searchParam"
        :columns="searchColumns"
        :search-col="searchCol"
        :search-show="searchShow"
        :tab="tab"
        @val-change="valChange"
    />
    <slot name="tableHeader"></slot>
    <!-- 表格主体 -->
    <el-table
        ref="tableRef"
        class="mt-md"
        size="large"
        header-cell-class-name="table-header-color"
        v-bind="$attrs"
        :data="tableData"
        :border="border"
        :row-key="getRowKeys"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :default-expand-all="false"
        @selection-change="selectionChange"
    >
        <template v-for="item in tableColumns" :key="item">
            <!-- selection || index -->
            <el-table-column
                v-if="item.type == 'selection'"
                v-bind="item"
                :align="item.align ?? 'center'"
                :reserve-selection="item.type == 'selection'"
            >
            </el-table-column>
            <!-- index -->
            <el-table-column
                v-if="item.type == 'index'"
                v-bind="item"
                :align="item.align ?? 'center'"
                :index="indexMethod"
            >
            </el-table-column>

            <!-- expand -->
            <el-table-column
                v-if="item.type == 'expand'"
                v-bind="item"
                :label="item.label"
                :align="item.align ?? 'center'"
                type="expand"
            >
                <template #default="expandProps">
                    {{ expandProps }}
                </template>
            </el-table-column>
            <!-- other 循环递归 -->
            <TableColumn
                v-if="!item.type && item.prop && item.isShow"
                :column="item"
            >
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                    <slot :name="slot" :row="scope.row"></slot>
                </template>
            </TableColumn>
        </template>
        <!-- 无数据 -->
        <template #empty>
            <div class="column justify-center items-center">暂无数据</div>
        </template>
    </el-table>
    <!-- 列设置 -->
    <ColSetting
        v-if="toolButton"
        ref="colRef"
        v-model:colSetting="colSetting"
    />
    <!-- 分页组件 -->
    <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
    />
</template>

<script setup lang="ts" name="ProTable">
// element css
import { BreakPoint } from '@/components/Grid/interface';
import ProSearch from '@/components/ProSearch/index.vue';
import { ColumnProps, SearchShowProps } from '@/components/ProTable/interface';
import { useSelection } from '@/hooks/useSelection.hook';
import { useTable } from '@/hooks/useTable.hook';
import { handleProp } from '@/utils/utils';
import { ElTable, TableProps } from 'element-plus';
import 'element-plus/dist/index.css';
import { provide, ref, watch } from 'vue';
import ColSetting from './components/ColSetting.vue';
import Pagination from './components/Pagination.vue';
import TableColumn from './components/TableColumn.vue';
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    title: '',
    pagination: true, // 是否显示分页
    initParam: {},
    border: true,
    toolButton: true,
    selectId: 'id',
    isShowSearch: true,
    tab: '',
    searchShow: () => ({
        add: true,
        search: true,
        reset: true,
        backup: false,
        back: false,
    }),
    searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});
// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);
interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
    columns: ColumnProps[]; // 列配置项
    requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
    dataCallback?: (data: any) => void; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
    toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
    selectId?: string; // 当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    searchShow?: SearchShowProps;
    searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
    isShowSearch?: boolean;
    tab?: string;
}
// 列设置 ==> 过滤掉不需要设置显隐的列
const colRef = ref();
const colSetting = tableColumns.value!.filter((item) => {
    return (
        item.isShow &&
        item.type !== 'selection' &&
        item.type !== 'index' &&
        item.type !== 'expand' &&
        item.prop !== 'operation'
    );
});
// 控制列设置显隐(暂不启用)
// const openColSetting = () => {
//     colRef?.value?.openColSetting();
// };
// 清除选择
const clearSelection = () => {
    tableRef?.value?.clearSelection();
};
// 表格多选 Hooks
const {
    selectionChange,
    getRowKeys,
    selectedList,
    selectedListIds,
    isSelected,
} = useSelection(props.selectId);
// 表格操作 Hooks
const {
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
} = useTable(
    props.requestApi,
    props.initParam,
    props.pagination,
    props.dataCallback,
    clearSelection,
);
// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide('enumMap', enumMap);
// 监听页面 initParam 改化，重新获取表格数据
watch(
    () => props.initParam,
    () => {
        getTableList();
    },
    { deep: true },
);

// 扁平化 columns && 处理 tableColumns 数据
const flatColumnsFunc = (
    columns: ColumnProps[],
    flatArr: ColumnProps[] = [],
) => {
    columns.forEach(async (col) => {
        if (col._children?.length)
            flatArr.push(...flatColumnsFunc(col._children));
        flatArr.push(col);

        // 给每一项 column 添加 isShow && isFilterEnum 属性
        col.isShow = col.isShow ?? true;
        col.isFilterEnum = col.isFilterEnum ?? true;

        if (!col.enum) return;
        // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
        if (typeof col.enum !== 'function')
            return enumMap.value.set(col.prop!, col.enum);
        const res = await col.enum();
        //console.log(res);
        const data = res.data ? res.data : res.data?.records;
        // 若search存在key 则以key作为匹配存储
        col.search?.key
            ? enumMap.value.set(col.search?.key, data)
            : enumMap.value.set(col.prop!, data);
        //console.log(enumMap.value, data);
    });
    return flatArr.filter((item) => !item._children?.length);
};

const searchColumns = ref<ColumnProps[]>([]);

const handleSearchColumn = (data: ColumnProps[]) => {
    const flatColumns = flatColumnsFunc(data);
    searchColumns.value = flatColumns
        .filter((item) => item.search?.el)
        .sort((a, b) => (b.search?.order ?? 0) - (a.search?.order ?? 0));
    // default value
    searchColumns.value.forEach((column) => {
        if (
            column.search?.defaultValue !== undefined &&
            column.search?.defaultValue !== null
        ) {
            searchInitParam.value[
                column.search.key ?? handleProp(column.prop!)
            ] = column.search?.defaultValue;
        }
    });
};
watch(
    () => props.columns,
    (newVal) => {
        handleSearchColumn(newVal);
    },
    { immediate: true, deep: true },
);

interface IEmits {
    (event: 'add'): void;
    (event: 'backup'): void;
    (event: 'valChange', val: any, column: any): void;
    (event: 'back'): void;
}
const emits = defineEmits<IEmits>();
// 新增
const add = () => {
    emits('add');
};
// TODO 备份按钮（后期归纳为自由按钮及api）
const backup = () => {
    emits('backup');
};
// 选项框变化
const valChange = (val: any, column: ColumnProps) => {
    if (column.search && column.search.relation) {
        if (Array.isArray(column.search.relation)) {
            column.search.relation.forEach((item) => {
                searchParam.value[item] = '';
            });
        } else {
            searchParam.value[column.search.relation] = '';
        }
    }
    emits('valChange', val, column);
};
// 返回
const back = () => {
    emits('back');
};

defineExpose({
    element: tableRef,
    tableData,
    searchParam,
    pageable,
    getTableList,
    selectedList,
    selectedListIds,
    clearSelection,
    reset,
});
</script>
<style>
.table-header-color {
    color: var(--el-text-color-primary) !important;
    background: var(--el-fill-color-light) !important;
}
</style>
