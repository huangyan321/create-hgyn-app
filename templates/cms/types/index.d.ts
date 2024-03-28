interface RouteTreeType {
    id: number;
    icon: string;
    name: string;
    url: string;
    parentId: number;
    sort: number;
    children: routeType[];
}
/**
 * page type
 */
interface PagingParam {
    pageNum?: number;
    pageSize?: number;
}
/**
 * axios usual response
 */
interface IResponseType<P = Record<string, never>> {
    code?: number;
    status?: number;
    msg: string;
    data: P;
}
interface IResponse {
    code?: number;
    data: any;
    message: string;
}
/**
 * userinfo
 */
interface UserInfo {
    areaId: number;
    deptId: number;
    errorLoginNumber: number;
    id: number;
    isDelete: string;
    isEnable: string;
    isStrongPassword: string;
    lastLoginTime: string;
    phone: string;
    remark: string;
    token: string;
    userAddress: string;
    userBirthday: string;
    userDuty: string;
    userIdcard: string;
    userName: string;
    userNameKey: string;
    userOutNo: string;
    userPassword: string;
    userPic: string;
    userProfessional: string;
    userRealname: string;
    userSex: string;
    userType: string;
    roleIdList: Array<string>;
    roleList: Array<RoleInfo>;
    treeLabel?: string;
}

/**
 * menu info
 */
interface menuInfo {
    id: number;
    isEnable: string;
    menuIcon: string;
    menuLever: number;
    menuName: string;
    menuType: string;
    menuUrl: string;
    parentId: number;
    remark: string;
    sort: number;
    children?: menuInfo[];
    hasChildren?: boolean;
}
interface RouterInfo {
    id: number;
    name: string;
    icon: string;
    parentId: number;
    sort: number;
    url: string;
    component?: () => void;
    children?: [];
    path: string | undefined;
    redirect: string;
}

/**
 * 角色按钮权限信息
 */
interface SysRoleBtn {
    buttonList: menuInfo[];
    isTab: boolean;
    parentMenu: menuInfo;
    tab: menuInfo | null;
}
interface MenuInfo {
    id: number;
    isEnable: string;
    menuIcon: string;
    menuLever: number;
    menuName: string;
    menuType: string;
    menuUrl: string;
    parentId: number;
    remark: string;
    sort: number;
}
type MenuListItem = Partial<MenuInfo>;
interface RoleInfo {
    id: number;
    isEnable: string;
    menuIdList: number[];
    menuList: Array<MenuListItem>;
    remark: string;
    roleCode: string;
    roleName: string;
}
