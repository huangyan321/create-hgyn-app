import request from '@/utils/axios';

/**
 * 登录
 */

export const login = (userName: string, userPassword: string) => {
    return request<IResponseType<UserInfo>>({
        url: 'system/sysUser/login',
        method: 'post',
        data: {
            userName,
            userPassword,
        },
    });
};
