import { defineStore } from 'pinia';
import { logout } from '@/utils';

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            userInfo: {} as UserInfo,
        };
    },
    actions: {
        updateUserInfo(data: UserInfo) {
            this.userInfo = data;
        },
        resetUserInfo() {
            this.userInfo = {} as UserInfo;
        },
        logout() {
            this.userInfo = {} as UserInfo;
            // window.localStorage.clear();
        },
    },
    getters: {
        getUserToken(): string {
            return this.userInfo.token;
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'DEVICE-ADMIN-USER',
                storage: localStorage,
            },
        ],
    },
});
