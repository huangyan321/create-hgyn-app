import { ResultEnum } from '@/enums/httpEnum';
// 控制台
export enum ControlEnum {
    Control_HOME = '/control-main',
    Control_HOME_NAME = 'controlMain',
}
// 项目管理
export enum PorjectEnum {
    PROJECT_HOME = '/projectManage',
    PROJECT_HOME_NAME = 'projectManage',
}
// 设备管理
export enum DeviceEnum {
    Device_HOME = '/deviceManage',
    Device_HOME_NAME = 'deviceManage',
}
// 日志管理
export enum LogEnum {
    LOG_HOME = '/log-manage',
    LOG_HOME_NAME = 'logManage',
    // 设备日志
    DEVICE_HOME = '/log-manage/deviceLog',
    DEVICE_HOME_NAME = 'deviceLog',
    // 用户日志
    USER_HOME = '/log-manage/userLog',
    USER_HOME_NAME = 'userLog',
}
// 系统管理
export enum SysEnum {
    SYS_HOME = '/system',
    SYS_HOME_NAME = 'system',
    // 菜单管理
    MENU_HOME = '/system/menuManage',
    MENU_HOME_NAME = 'menuManage',
    // 用户管理
    USER_HOME = '/system/userManage',
    USER_HOME_NAME = 'userManage',
    // 角色管理
    ROLE_HOME = '/system/roleManage',
    ROLE_HOME_NAME = 'roleManage',
    // 权限管理
    PERMISSION_HOME = '/system/permissionManage',
    PERMISSION_HOME_NAME = 'permissionManage',
    // 参数管理
    PARAMS_HOME = '/system/paramsManage',
    PARAMS_HOME_NAME = 'paramsManage',
    // 字典管理
    DICT_HOME = '/system/dictionaryManage',
    DICT_HOME_NAME = 'dictionaryManage',
    // 版本管理
    VERSION_HOME = '/system/versionManage',
    VERSION_HOME_NAME = 'versionManage',
}
export enum PageEnum {
    // 登录
    BASE_LOGIN = '/login',
    BASE_LOGIN_NAME = 'Login',

    //重定向
    REDIRECT = '/redirect',
    REDIRECT_NAME = 'Redirect',
    RELOAD = '/reload',
    RELOAD_NAME = 'Reload',

    // 首页
    BASE_HOME = '/main',
    BASE_HOME_NAME = 'main',

    // 错误
    ERROR_PAGE_NAME_403 = '403',
    ERROR_PAGE_NAME_404 = '404',
    ERROR_PAGE_NAME_500 = '500',
}

export const ErrorPageNameMap = new Map([
    [ResultEnum.NOT_FOUND, PageEnum.ERROR_PAGE_NAME_404],
    [ResultEnum.SERVER_FORBIDDEN, PageEnum.ERROR_PAGE_NAME_403],
    [ResultEnum.SERVER_ERROR, PageEnum.ERROR_PAGE_NAME_500],
]);
