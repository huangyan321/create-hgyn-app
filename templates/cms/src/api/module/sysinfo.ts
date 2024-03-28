import request from '@/utils/axios';

/**
 * 1、查询系统信息
 */

export const querySysInfoByOne = (data: object) => {
    return request<IResponse>({
        url: 'system/sysInfo/querySysInfoByOne',
        method: 'post',
        data: data,
    });
};
/**
 * 2、保存系统信息
 */

export const saveSysInfo = (data: object) => {
    return request<IResponse>({
        url: 'system/sysInfo/saveSysInfo',
        method: 'post',
        data: data,
    });
};
//查询医院授权期限
export function queryValidateExpiryDate(data: object) {
    return request({
        url: '/system/sysInfo/queryValidateExpiryDate',
        method: 'post',
        data,
    });
}
