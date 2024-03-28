<!-- 菜单管理-->
<template>
    <ProTable
        ref="proTable"
        title="菜单管理"
        :columns="columns"
        :request-api="API.querySysMenu"
        :init-param="initParam"
        :search-show="searchShow"
        :pagination="false"
        :data-callback="dataHandle"
        highlight-current-row
        stripe
        @add="operate('add', {})"
    >
        <!-- 表格操作 -->
        <template #operation="scope">
            <el-button
                v-auth="'MODIFY'"
                type="primary"
                link
                @click="operate('edit', scope.row)"
                >修改</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-button
                v-auth="'DELETE'"
                type="danger"
                link
                @click="operate('delete', scope.row)"
                >删除</el-button
            >
        </template>
    </ProTable>
    <Form ref="formDialog" :menu-type-list="menuTypeList"></Form>
</template>

<script lang="tsx" setup name="ParamsManage">
import { ref, reactive, onMounted } from 'vue';
import API from '@/api';
import ProTable from '@/components/ProTable/index.vue';
import Form from './components/Form/index.vue';
import { ColumnProps } from '@/components/ProTable/interface';
import { usePublicStore } from '@/store/modules/public';
import usePublic from '@/hooks/usePublic.hook';
import { MenuEnumMap, MenuTypeEnumMap } from '@/enums/usualEnum';
import { getIconVNode } from '@/utils/icon';
const { notify, messageBox } = usePublic();
const publicStore = usePublicStore();
const formDialog = ref();
const proTable = ref();
let menuTypeList = reactive<DictInfo[]>([]);
let menu_list_f = ref<menuInfo[]>([]); // 一级菜单
let menu_list_s = ref<menuInfo[]>([]); // 二级菜单
let menu_list_t = ref<menuInfo[]>([]); // 三级菜单
const searchShow = {
    add: true,
    search: true,
    reset: true,
    backup: false,
};
onMounted(async () => {
    if (publicStore.dictAll['sys_menu_type']) {
        menuTypeList = publicStore.dictAll['sys_menu_type'];
    }
});
const dataHandle = (data: any) => {
    data.map((item: menuInfo) => {
        item.children = [];
    });
    if (data) {
        menu_list_f.value = data.filter((item: any) => item.menuType === '1');
        menu_list_s.value = data.filter((item: any) => item.menuType === '2');
        menu_list_t.value = data.filter((item: any) => item.menuType === '3');
    }
    const list = [...menu_list_f.value];
    list.map((item: menuInfo) => {
        menu_list_s.value.map((item_s: menuInfo) => {
            if (item_s.parentId === item.id) {
                item.children?.push(item_s);
            }
            //二级遍历三级
            menu_list_t.value.map((item_t: menuInfo) => {
                if (item_t.parentId === item_s.id) {
                    item_s.children?.push(item_t);
                }
            });
        });
    });
    return list;
};
// 表格配置项
const columns: ColumnProps[] = [
    {
        prop: 'menuName',
        label: '菜单名称',
        search: { el: 'input', props: { placeholder: '请输入菜单名称' } },
        width: 200,
        align: 'left',
    },
    {
        prop: 'menuIcon',
        label: '菜单图标',
        render: (scope) => {
            return getIconVNode(scope.row.menuIcon);
        },
    },
    {
        prop: 'menuType',
        label: '菜单类型',
        render: (scope) => {
            return (
                <el-tag
                    size="large"
                    type={MenuTypeEnumMap.get(scope.row.menuType)}
                >
                    {MenuEnumMap.get(scope.row.menuType)}
                </el-tag>
            );
        },
    },
    {
        prop: 'sort',
        label: '菜单排序',
    },
    {
        prop: 'menuUrl',
        label: 'URL',
    },
    {
        prop: 'remark',
        label: '备注',
    },
    {
        prop: 'isEnable',
        label: '是否启用',
        render: (scope) => {
            return (
                <el-tag
                    type={scope.row.isEnable === '1' ? 'success' : 'danger'}
                >
                    {scope.row.isEnable === '1' ? '启用' : '未启用'}
                </el-tag>
            );
        },
    },
    {
        prop: 'operation',
        label: '操作',
        fixed: 'right',
        width: 180,
    },
];
// 初始化请求菜单
const initParam = reactive({
    menuTypeList: [1, 2, 9],
});
// 打开 form-dialog(新增、查看、编辑)
const operate = (type: string, rowData: Partial<ParamsInfo> = {}) => {
    if (type === 'delete') {
        messageBox('提示', '此操作将永久删除数据，是否继续', 'warning', () => {
            API.deleteSysMenu({ id: rowData.id }).then((res: IResponse) => {
                notify('success', res.message);
                proTable.value?.getTableList();
            });
        });
        return;
    }
    let params = {
        title: type === 'edit' ? '修改' : '新增',
        rowData: { ...rowData },
        api:
            type === 'add'
                ? API.saveSysMenu
                : type === 'edit'
                ? API.updateSysMenu
                : '',
        getTableList: proTable.value.getTableList,
        menuTypeList: menuTypeList,
        menu_list_f: menu_list_f,
        menu_list_s: menu_list_s,
    };
    formDialog?.value?.acceptParams(params);
};
</script>
