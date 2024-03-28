<template>
    <Dialog
        :form-show="dialogVisible"
        :title="dialogProps.title"
        @close="dialogVisible = false"
    >
        <template #body>
            <el-form
                ref="ruleFormRef"
                size="large"
                :model="dialogProps.rowData"
                label-width="150px"
                :rules="rules"
            >
                <el-form-item prop="menuName" label="菜单名称">
                    <el-input
                        v-model="dialogProps.rowData!.menuName"
                        class="form-item"
                        maxlength="50"
                        placeholder="菜单名称"
                        clearable
                    />
                </el-form-item>
                <el-form-item prop="menuType" label="菜单类型">
                    <el-radio-group v-model="dialogProps.rowData!.menuType">
                        <el-radio label="1" border>一级菜单</el-radio>
                        <el-radio label="2" border>二级菜单</el-radio>
                        <el-radio label="3" border>三级菜单</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    v-if="dialogProps.rowData!.menuType === '2'"
                    prop="parentId"
                    label="上级菜单"
                >
                    <el-select
                        v-model="dialogProps.rowData!.parentId"
                        placeholder="请选择上级菜单"
                        size="default"
                        clearable
                    >
                        <el-option
                            v-for="item in dialogProps.menu_list_f"
                            :key="item.id"
                            :label="item.menuName"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="dialogProps.rowData!.menuType === '3'"
                    prop="parentId"
                    label="上级菜单"
                >
                    <el-select
                        v-model="dialogProps.rowData!.parentId"
                        placeholder="请选择上级菜单"
                        size="default"
                        clearable
                    >
                        <el-option
                            v-for="item in dialogProps.menu_list_s"
                            :key="item.id"
                            :label="item.menuName"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item prop="menuUrl" label="URL路径">
                    <el-input
                        v-model="dialogProps.rowData!.menuUrl"
                        class="form-item"
                        maxlength="50"
                        placeholder="请输入URL"
                        clearable
                    />
                </el-form-item>

                <el-form-item
                    v-if="dialogProps.rowData!.menuType === '1'"
                    prop="menuIcon"
                    label="菜单图标"
                >
                    <icon-list
                        :select-icon="dialogProps.rowData!.menuIcon"
                        :dialog-visible="dialogVisible"
                        @check-icon="checkIcon"
                    />
                </el-form-item>
                <el-form-item prop="sort" label="菜单排序">
                    <el-input-number
                        v-model="dialogProps.rowData!.sort"
                        :min="0"
                        :max="10"
                        :step="1"
                        controls-position="right"
                        placeholder="请输入菜单排序"
                    />
                </el-form-item>
                <el-form-item prop="remark" label="菜单描述">
                    <el-input
                        v-model="dialogProps.rowData!.remark"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入菜单描述"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch
                        v-model="dialogProps.rowData!.isEnable"
                        active-value="1"
                        inactive-value="0"
                    />
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer row justify-end items-center">
                <el-button
                    size="large"
                    type="default"
                    @click="dialogVisible = false"
                    >取消</el-button
                >
                <el-button size="large" type="primary" @click="handleSubmit"
                    >保存</el-button
                >
            </span>
        </template>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import iconList from '../Icon/index.vue';
import Dialog from '@/components/Dialog/index.vue';
import usePublic from '@/hooks/usePublic.hook';
const { notify } = usePublic();
const ruleFormRef = ref<FormInstance>();
interface DialogProps {
    title: string;
    rowData?: any;
    api?: (params: any) => Promise<any>;
    getTableList?: () => Promise<any>;
    menu_list_f: menuInfo[];
    menu_list_s: menuInfo[];
}
// dialog框状态
const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
    title: '',
    menu_list_f: [],
    menu_list_s: [],
});

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps): void => {
    dialogProps.value = params;
    dialogVisible.value = true;
    ruleFormRef.value?.clearValidate();
};
// 提交数据（新增/编辑）
const handleSubmit = async () => {
    if (!ruleFormRef.value) {
        notify('error', 'opps~出错了！请刷新重试!');
        return;
    }
    ruleFormRef.value!.validate(async (valid) => {
        if (!valid) return;
        await dialogProps.value.api!(dialogProps.value.rowData);
        notify('success', '保存成功！');
        dialogProps.value.getTableList!();
        dialogVisible.value = false;
    });
};
const rules = reactive<FormRules>({
    menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
    menuType: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
    menuUrl: [{ required: true, message: '请输入URL', trigger: 'blur' }],
    menuIcon: [{ required: true, message: '请选择菜单图标', trigger: 'blur' }],
});
// 图标更改
const checkIcon = (e: string) => {
    dialogProps.value.rowData!.menuIcon = e;
};
defineExpose({ acceptParams });
</script>

<style lang="less" scoped></style>
