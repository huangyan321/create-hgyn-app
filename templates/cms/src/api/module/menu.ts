import request from '@/utils/axios';

/**
 * 1、查询菜单
 */

export const querySysMenu = (data: object) => {
    return request<IResponse>({
        url: 'system/sysMenu/querySysMenu',
        method: 'post',
        data: data,
    });
};
/**
 * 2、保存菜单
 */

export const saveSysMenu = (data: object) => {
    return request<IResponse>({
        url: 'system/sysMenu/saveSysMenu',
        method: 'post',
        data: data,
    });
};
/**
 * 3、修改菜单
 */

export const updateSysMenu = (data: object) => {
    return request<IResponse>({
        url: 'system/sysMenu/updateSysMenu',
        method: 'post',
        data: data,
    });
};
/**
 * 4、删除菜单
 */

export const deleteSysMenu = (data: object) => {
    return request<IResponse>({
        url: 'system/sysMenu/deleteSysMenu',
        method: 'post',
        data: data,
    });
};
/**
 * 
5、根据菜单id查询菜单
 */
export const querySysMenuById = (data: object) => {
    return request<IResponse>({
        url: 'system/sysMenu/querySysMenuById',
        method: 'post',
        data: data,
    });
};

/**
 * 
 6. 根据菜单节点ID和角色ID查询操作权限
 */
export const querySysMenuByParentId = (data: object) => {
    return request<IResponse>({
        url: '/system/sysMenu/querySysMenuByParentId',
        method: 'post',
        params: data,
    });
};
/**
 * 
7、根据角色ID查询操作权限和父级菜单
 */
export const querySysMenuByRoleId = (data: object) => {
    return request<IResponse>({
        url: '/system/sysMenu/querySysMenuByRoleId',
        method: 'post',
        params: data,
    });
};
