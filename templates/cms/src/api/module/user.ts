import request from '@/utils/axios';

/**
 * 2、（分页）查询用户（职工）
 */

export const querySysUser = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/querySysUser',
        method: 'post',
        data: data,
    });
};
/**
 * 3、保存用户（职工）
 */

export const saveSysUser = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/saveSysUser',
        method: 'post',
        data: data,
    });
};
/**
 * 4、修改用户（职工）
 */

export const updateSysUser = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/updateSysUser',
        method: 'post',
        data: data,
    });
};
/**
 * 5、删除用户（职工）
 */

export const deleteSysUser = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/deleteSysUser',
        method: 'post',
        data: data,
    });
};
/**
 * 
6、根据用户id查询用户（职工）
 */
export const querySysUserById = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/querySysUserById',
        method: 'post',
        data: data,
    });
};
/**
 * 
7、（不分页）查询用户（职工）
 */
export const querySysUserList = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/querySysUserList',
        method: 'post',
        data: data,
    });
};
/**
 * 
11、修改用户密码
 */
export const updateSysUserPwd = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/updateSysUserPwd',
        method: 'post',
        data: data,
    });
};
/**
 * 
13、根据用户id，批量删除用户
 */
export const deleteBatchSysUser = (data: object) => {
    return request<IResponse>({
        url: 'system/sysUser/deleteBatchSysUser',
        method: 'post',
        data: data,
    });
};
