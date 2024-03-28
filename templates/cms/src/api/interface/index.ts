// * 请求响应参数(不包含data)
export interface Result {
    code: string;
    msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
    data: T;
}

// * 分页响应参数
export interface ResPage<T> {
    records: T[];
    current: number;
    size: number;
    total: number;
}

// * 分页请求参数
export interface ReqPage {
    pageNum: number;
    pageSize: number;
    isEnable: string;
}
// * 删除通用参数
export interface ReqDelete {
    id: string;
}
// * 角色管理模块
export interface ReqQueryRoleParams extends ReqPage {
    roleCode: string;
    roleName: string[];
}
