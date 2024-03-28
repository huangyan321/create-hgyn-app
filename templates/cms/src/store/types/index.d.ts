interface IDict {
    createTime: string;
    createUser: string;
    dictCode: string;
    dictId: number;
    dictType: string;
    dictTypeName: string;
    dictValue: string;
    id: number;
    isEnable: '1' | '0';
    remark: string;
    sort: number;
    updateTime: string;
    updateUser: string;
}
export interface IDictMap {
    [propName: string]: IDict[];
}
