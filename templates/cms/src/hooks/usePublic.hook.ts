import router from '@/router';
import { ElMessageBox, ElNotification, ElInput } from 'element-plus';
import { Component, h, ref } from 'vue';
const usePublic = () => {
    // 通知
    const notify = (
        type: '' | 'success' | 'warning' | 'info' | 'error' = 'success',
        msg = '保存成功',
    ) => {
        ElNotification({
            title: '温馨提示',
            message: msg,
            type: type,
            position: 'top-right',
        });
    };
    // 确认
    const messageBox = (
        title = '温馨提示',
        desc = '确认进行此操作吗',
        types = 'warning',
        cb: () => void,
    ) => {
        ElMessageBox.confirm(desc, title, {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            buttonSize: 'large',
            type: 'warning',
        })
            .then(() => {
                cb();
                //  notify('success', '操作成功！');
            })
            .catch(() => null);
    };
    // messageAlert
    const messageAlert = (
        title = '温馨提示',
        desc = '确认进行此操作吗',
        type: '' | 'success' | 'warning' | 'info' | 'error' = 'success',
        cb: () => void,
        icon?: string | Component,
    ) => {
        ElMessageBox.alert(desc, title, {
            confirmButtonText: '确认',
            buttonSize: 'large',
            type,
            icon,
        })
            .then(() => {
                cb();
                // notify('success', '操作成功！');
            })
            .catch(() => null);
    };
    /**
     *
     * @param title 标题
     * @param desc 描述
     * @param cb 成功回调
     * @param cc 取消回调
     */
    const messagePrompt = (
        title = '温馨提示',
        desc = '请输入',
        cb: (e?: string) => void,
        cc: () => void,
    ) => {
        ElMessageBox.prompt(desc, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showClose: false,
            closeOnClickModal: false,
            dangerouslyUseHTMLString: true,
            buttonSize: 'large',
            inputValidator: (e) => {
                if (!e) return false;
                return true;
            },
            inputErrorMessage: '请输入正确的密码!',
        })
            .then(({ value }) => {
                cb(value);
            })
            .catch(() => cc());
    };
    const prompt = () => {
        const e = ref('');
        ElMessageBox({
            title: '提示',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showClose: false,
            closeOnClickModal: false,
            buttonSize: 'default',
            message: h(ElInput, {
                modelValue: e.value,
                placeholder: '请输入密码',
                showPassword: true,
                size: 'default',
                'onUpdate:modelValue': (val: string) => {
                    e.value = val;
                    console.log(e);
                },
            }),
        });
    };
    // 路由跳转
    const routeTo = (path: string) => {
        router.currentRoute.value.fullPath === path
            ? ''
            : router.push({ path: path });
    };
    return {
        notify,
        messageBox,
        messageAlert,
        messagePrompt,
        routeTo,
        prompt,
    };
};
export default usePublic;
