import { defineStore } from 'pinia';
import API from '@/api';
import { usePublicStore } from '@/store/modules/public';
// AuthStore
export const useAuthStore = defineStore({
    id: 'AuthState',
    state: () => ({
        // 当前页面的 router name，用来做按钮权限筛选
        routeName: '',
        // 按钮权限列表
        authButtonList: [] as SysRoleBtn[],
    }),
    getters: {
        // 按钮权限列表
        authButtonListGet: (state) => state.authButtonList,
    },
    actions: {
        // getAuthButtonList
        async getAuthButtonList(id?: number) {
            const publicStore = usePublicStore();
            await API.querySysMenuByRoleId({
                roleId: publicStore.roleId ?? id,
            }).then((res: IResponse) => {
                this.authButtonList = res?.data;
            });
        },
        // setRouteName
        async setRouteName(name: string) {
            this.routeName = name;
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'DEVICE-ADMIN-AUTH',
                storage: localStorage,
            },
        ],
    },
});
