import request from '@/utils/axios';

/**
 * 1、（分页）查询字典类型
 */

export const querySysDict = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/querySysDict',
        method: 'post',
        data: data,
    });
};
/**
 * 2、保存字典类型
 */

export const saveSysDict = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/saveSysDict',
        method: 'post',
        data: data,
    });
};
/**
 * 3、修改字典类型
 */

export const updateSysDict = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/updateSysDict',
        method: 'post',
        data: data,
    });
};
/**
 * 4、删除字典类型
 */

export const deleteSysDict = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/deleteSysDict',
        method: 'post',
        data: data,
    });
};
/**
 * 4-1、批量删除字典类型(主表及子表都将被删除)
 */

export const deleteBatchSysDict = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/deleteBatchSysDict',
        method: 'post',
        data: data,
    });
};
/**
 * 5、（分页）查询字典类型细表
 */
export const querySysDictItem = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/querySysDictItem',
        method: 'post',
        data: data,
    });
};

/**
 * 6、保存字典类型细表
 */
export const saveSysDictItem = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/saveSysDictItem',
        method: 'post',
        data: data,
    });
};

/**
 * 7、修改字典类型细表
 */
export const updateSysDictItem = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/updateSysDictItem',
        method: 'post',
        data: data,
    });
};

/**
 * 8、删除字典类型细表
 */
export const deleteSysDictItem = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/deleteSysDictItem',
        method: 'post',
        data: data,
    });
};

/**
 * 8-1、批量删除字典类型细表
 */
export const deleteBatchSysDictItemParams = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/deleteBatchSysDictItemParams',
        method: 'post',
        data: data,
    });
};

/**
 * 9、根据字典类型获取下拉字典列表
 */
export const querySysDictItemByDictType = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/querySysDictItemByDictType',
        method: 'post',
        data: data,
    });
};

/**
 * 10、根据字典类型id查询字典类型数据
 */
export const querySysDictById = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/querySysDictById',
        method: 'post',
        data: data,
    });
};

/**
 * 11、根据字典类型细表id查询字典类型细表
 */
export const querySysDictItemById = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/querySysDictItemById',
        method: 'post',
        data: data,
    });
};
/**
 * 12、获取所有字典类型，并获取对应字典类型细表
 */
export const queryAllSysDictAndItem = (data: object) => {
    return request<IResponse>({
        url: 'system/sysDict/queryAllSysDictAndItem',
        method: 'post',
        data: data,
    });
};
