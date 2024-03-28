import request from '@/utils/axios';
import { ReqQueryRoleParams, ResPage, ReqDelete } from '../interface/index';
/**
 * 1、（分页）查询角色
 */

export const querySysRole = (data: ReqQueryRoleParams) => {
    return request<ResPage<[]>>({
        url: 'system/sysRole/querySysRole',
        method: 'post',
        data: data,
    });
};
/**
 * 2、保存角色
 */

export const saveSysRole = (data: object) => {
    return request<ResPage<any>>({
        url: 'system/sysRole/saveSysRole',
        method: 'post',
        data: data,
    });
};
/**
 * 3、修改角色
 */

export const updateSysRole = (data: object) => {
    return request<IResponse>({
        url: 'system/sysRole/updateSysRole',
        method: 'post',
        data: data,
    });
};
/**
 * 4、删除角色
 */

export const deleteSysRole = (data: ReqDelete) => {
    return request<ReqDelete>({
        url: 'system/sysRole/deleteSysRole',
        method: 'post',
        data: data,
    });
};
/**
 * 
5、根据角色id查询角色
 */
export const querySysRoleById = (data: object) => {
    return request<IResponse>({
        url: 'system/sysRole/querySysRoleById',
        method: 'post',
        data: data,
    });
};

/**
 * 
6、（不分页）查询角色
 */
export const querySysRoleList = (data: object) => {
    return request<IResponse>({
        url: 'system/sysRole/querySysRoleList',
        method: 'post',
        data: data,
    });
};
/**
 * 
7、角色绑定用户列表
 */
export const updateRoleUserList = (data: object) => {
    return request<IResponse>({
        url: 'system/sysRole/updateRoleUserList',
        method: 'post',
        data: data,
    });
};
/**
 * 
8、根据角色ID查询绑定用户列表
 */
export const queryUserListByRoleId = (e: string) => {
    return request<IResponse>({
        url: 'system/sysRole/queryUserListByRoleId/' + e,
        method: 'post',
    });
};
