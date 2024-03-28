<template>
    <div class="row justify-center items-center">
        <el-dropdown size="large">
            <div class="hover-btn row justify-center items-center pa-md mr-md">
                <el-avatar :src="headDefault" />
                <span class="ml-md text-nowrap text-ellipsis">{{
                    userName
                }}</span>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        class="row justify-center items-center"
                        @click="switchShow('version')"
                        ><span
                            ><el-icon><InfoFilled /></el-icon>版本信息</span
                        ></el-dropdown-item
                    >
                    <el-dropdown-item @click="switchShow('reg')"
                        ><span
                            ><el-icon><CircleCheckFilled /></el-icon>授权</span
                        ></el-dropdown-item
                    >
                    <el-dropdown-item @click="toLogout"
                        ><span
                            ><el-icon><SwitchButton /></el-icon>退出登录</span
                        ></el-dropdown-item
                    >
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <Dialog
            width="35%"
            :form-show="formShow"
            :title="formTitle"
            @close="formShow = false"
        >
            <template #body>
                <div
                    v-if="showType === 'version'"
                    class="row justify-center items-center"
                >
                    <el-icon><InfoFilled /></el-icon
                    >DNK_S_DOP_MP_V3.0.1_20230113
                </div>
                <el-form
                    v-if="showType === 'reg'"
                    ref="ruleForm"
                    size="large"
                    :model="formData"
                    label-width="80px"
                >
                    <el-form-item label="序列号">
                        {{ formData.dmidecodeUUID }}
                    </el-form-item>
                    <el-form-item prop="remark" label="有效期">
                        <el-input
                            v-model="formData.sysInfoExpiryDate"
                            disabled
                        />
                    </el-form-item>
                    <el-form-item prop="remark" label="注册码">
                        <el-input
                            v-model="formData.license"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入注册码"
                            clearable
                        />
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <span class="mt-md dialog-footer row justify-end items-center">
                    <el-button
                        size="large"
                        type="default"
                        @click="formShow = false"
                        >取消</el-button
                    >
                    <el-button size="large" type="primary" @click="save"
                        >保存</el-button
                    >
                </span>
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import headDefault from '@/assets/usual/head_default.png';
import router from '@/router';
import { usePublicStore } from '@/store/modules/public';
import { useUserStore } from '@/store/modules/user';
import usePublic from '@/hooks/usePublic.hook';
import API from '@/api';
import { logout } from '@/utils';

const { notify } = usePublic();
const publicStore = usePublicStore();
const userStore = useUserStore();
const formData = ref({
    sysInfoExpiryDate: '',
    dmidecodeUUID: '',
    license: '',
} as RegType);
const userName = computed(() => {
    return userStore.userInfo?.userName || '未知用户';
});
const formShow = ref(false);
const formTitle = ref('版本信息');
const showType = ref('version');
const toLogout = () => {
    logout();
    notify('success', '您已退出登录√');
};
const switchShow = (type: string) => {
    formTitle.value = type == 'version' ? '版本' : '授权信息';
    showType.value = type;
    formShow.value = true;
};
const save = () => {
    notify('success');
};
interface RegType {
    sysInfoExpiryDate: string;
    dmidecodeUUID: string;
    license: string;
}
</script>

<style lang="less" scoped></style>
