import request from '@/utils/axios';

/**
 * 1、（分页）查询系统参数
 */

export const querySysParam = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/querySysParam',
        method: 'post',
        data: data,
    });
};
/**
 * 2、保存系统参数
 */

export const saveSysParam = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/saveSysParam',
        method: 'post',
        data: data,
    });
};
/**
 * 3、修改系统参数
 */

export const updateSysParam = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/updateSysParam',
        method: 'post',
        data: data,
    });
};
/**
 * 4、删除系统参数
 */

export const deleteSysParam = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/deleteSysParam',
        method: 'post',
        data: data,
    });
};
/**
 * 4-1、批量删除系统参数
 */

export const deleteSysParamBatch = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/deleteSysParamBatch',
        method: 'post',
        data: data,
    });
};
/**
 * 7、查询参数类型列表
 */
export const queryParamTypeList = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/queryParamTypeList',
        method: 'post',
        data: data,
    });
};
/**
 * 8、不分页查询系统参数
 */
export const querySysParamList = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/querySysParamList',
        method: 'post',
        data: data,
    });
};

export const querySysParamByParamKey = (data: { paramKey: string }) => {
    return request<IResponse>({
        url: 'system/sysParam/querySysParamByParamKey',
        method: 'post',
        data,
    });
};

export const updateSysParamByParamKeyParams = (data: object) => {
    return request<IResponse>({
        url: 'system/sysParam/updateSysParamByParamKeyParams',
        method: 'post',
        data,
        hideLoading: true,
    });
};
