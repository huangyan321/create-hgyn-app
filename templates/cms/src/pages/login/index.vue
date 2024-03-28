<template>
    <div class="login full-width row justify-center items-end">
        <el-image class="full-width" fit="fill" :src="background" />
        <el-card
            class="box-card z-2 column justify-center items-center"
            :body-style="{ padding: '10px', width: '90%', minHeight: '85%' }"
        >
            <h1 class="text-center">设备运营平台</h1>
            <el-form
                ref="ruleForm"
                size="large"
                :model="loginData"
                :rules="rules"
                class="mt-lg"
            >
                <el-form-item prop="account">
                    <el-input
                        v-model="loginData.account"
                        class="form-item mt-md"
                        maxlength="30"
                        placeholder="请输入用户名"
                    >
                        <template #prefix>
                            <el-icon size="16px" color="#3E87E6"
                                ><User
                            /></el-icon> </template
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="loginData.password"
                        class="form-item mt-md"
                        maxlength="50"
                        type="password"
                        show-password
                        placeholder="请输入密码"
                        @keyup.enter="login(ruleForm)"
                    >
                        <template #prefix>
                            <el-icon size="16px" color="#3E87E6"
                                ><Lock
                            /></el-icon> </template
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked">记住登录名/密码</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button
                        class="z-2 col-10 size-md"
                        type="primary"
                        size="large"
                        @click="login(ruleForm)"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import type { FormRules, FormInstance } from 'element-plus';
import API from '@/api';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { usePublicStore } from '@/store/modules/public';
import { useAuthStore } from '@/store/modules/auth';
import md5 from 'js-md5';
import usePublic from '@/hooks/usePublic.hook';
import background from '@/assets/usual/login_background.png';
const { notify } = usePublic();
const publicStore = usePublicStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const ruleForm = ref<FormInstance>();
const checked = ref(false);
const loginData = reactive({
    account: '',
    password: '',
});
const rules = reactive<FormRules>({
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
onMounted(() => {
    const account = window.localStorage.getItem('DNK_S_DIC_MP_USER');
    const pwd = window.localStorage.getItem('DNK_S_DIC_MP_PWD');
    if (account && pwd) {
        loginData.account = account;
        loginData.password = pwd;
        checked.value = true;
    }
});
// 登录
const login = async (ruleForm: FormInstance | undefined) => {
    if (!ruleForm) {
        notify('error', '网络错误!');
        window.location.reload();
        return;
    }
    const isValid: boolean = await ruleForm.validate((valid) => {
        if (!valid) {
            notify('error', '请输入账号密码!');
            return false;
        } else {
            return true;
        }
    });
    if (isValid) {
        API.login(loginData.account, md5(loginData.password))
            .then(async (res: IResponseType<UserInfo>) => {
                publicStore.updateIsLogin(true);
                publicStore.updateToken(res?.data?.token, res?.data);
                publicStore.queryDic(); // 获取字典数据
                publicStore.queryParams(); // 获取系统参数
                publicStore.queryRoleList(); // 获取全部角色
                publicStore.setSourceHttp(); // 获取文件资源域名
                userStore.updateUserInfo(res?.data); // 获取用户信息 角色权限
                if (!res?.data?.roleList[0]?.id) {
                    notify('error', '账号角色有误，请联系管理员!');
                    return;
                }
                authStore.getAuthButtonList(res?.data?.roleList[0]?.id); // 获取按钮权限数据
                if (checked.value) {
                    // 记住密码
                    window.localStorage.setItem(
                        'DNK_S_DIC_MP_USER',
                        loginData.account,
                    );
                    window.localStorage.setItem(
                        'DNK_S_DIC_MP_PWD',
                        loginData.password,
                    );
                } else {
                    window.localStorage.removeItem('DNK_S_DIC_MP_USER');
                    window.localStorage.removeItem('DNK_S_DIC_MP_PWD');
                }
                router.push({ name: 'main' });
                notify('success', '欢迎回来!');
            })
            .catch((e: string) => {
                console.log(e);
            });
    }
};
</script>

<style scoped lang="scss">
h1 {
    color: #3e87e6;
    letter-spacing: 5px;
}
.login {
    overflow: hidden;
    height: 100vh;
}

.box-card {
    width: 24vw;
    height: 60vh;
    position: absolute;
    right: 5vw;
    top: 20vh;
    border-radius: 20px;
    min-width: 400px;
}
</style>
