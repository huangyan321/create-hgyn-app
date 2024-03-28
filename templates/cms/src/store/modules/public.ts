import { defineStore } from 'pinia';
import router from '@/router';
import API from '@/api';
import { EnumProps } from '@/components/ProTable/interface/index';
import { IDictMap } from '../types/index';
import { RouteRecordNormalized } from 'vue-router';
import { flatTreeData } from '@/utils/utils';
import { adminConfigData } from './admin.conf';
type dict = IDictMap & EnumProps;
export const usePublicStore = defineStore({
    id: 'public', // id必填，且需要唯一
    state: () => {
        return {
            isCollapse: false,
            asyncRoutestMark: false,
            isLogin: true,
            asyncRoute: [] as RouteTreeType[],
            source: { _axiosPromiseCancel: [] } as {
                _axiosPromiseCancel: any[];
            }, // request收集
            dynamicRoute: [] as RouteRecordNormalized[],
            userToken: '',
            userInfo: {} as UserInfo, //用户登录信息
            roleInfo: {} as RoleInfo, //用户角色信息
            dictList: {} as dict, //全字典数据
            permissionList: [] as Array<MenuListItem>, // 角色权限数据
            paramsList: [], //全系统参数数据
            roleList: [], //全角色数据
            sourceHttpOrigin: 'http://192.168.96.109:9902/dop', // 资源域名
            hasAddRoute: false, // 是否过滤过路由
        };
    },
    actions: {
        // 菜单展开
        updateIsCollapse(e: boolean) {
            this.isCollapse = e;
        },
        // 动态路由判断
        updateRoutestMark(e: boolean) {
            this.asyncRoutestMark = e;
        },
        // 是否登录
        updateIsLogin(e: boolean) {
            this.isLogin = e;
        },
        // 用户信息
        async updateToken(e: string, data: UserInfo) {
            this.userToken = e;
            this.userInfo = data;
            const roleId: number = data.roleList?.length
                ? data.roleList[0].id
                : 0;
            if (!roleId) {
                return;
            }
            this.getAuthPermissionList(roleId);
        },
        // 字典内容
        async queryDic() {
            await API.queryAllSysDictAndItem().then((res: IResponse) => {
                const data: any = {};
                res.data.map((item: any) => {
                    data[item.dictType] =
                        item.dictItemList?.filter((dict: any) => !!dict) || [];
                });
                this.dictList = data;
            });
        },
        // 系统参数
        async queryParams() {
            await API.querySysParamList({}).then((res: IResponse) => {
                this.paramsList = res?.data;
            });
        },
        // 资源域名
        setSourceHttp() {
            this.sourceHttpOrigin =
                import.meta.env.MODE === 'development'
                    ? import.meta.env.VITE_SOURCE_BASE_URL
                    : `http://${window.location.hostname}:9902/dop`;
        },
        // 全部角色
        async queryRoleList() {
            await API.querySysRoleList({}).then((res: IResponse) => {
                this.roleList = res?.data.map((item: RoleInfo) => {
                    return Object.assign(item, {
                        label: item.roleName,
                        value: item.roleCode,
                    });
                });
            });
        },
        // permission
        async getAuthPermissionList(roleId: number) {
            // 管理员账号 特殊处理返回全部固定菜单数据
            // if (roleId === 1) {
            //     this.roleInfo = adminConfigData;
            //     this.permissionList = adminConfigData.menuList;
            //     this.asyncRoute = flatTreeData(adminConfigData.menuList);
            //     return;
            // }
            await API.querySysRoleById({ id: roleId }).then(
                (res: IResponse) => {
                    this.roleInfo = res?.data;
                    this.permissionList = res?.data?.menuList;
                    this.asyncRoute = flatTreeData(res?.data?.menuList);
                },
            );
        },
        // logout
        resetToken() {
            this.isLogin = false;
            this.userToken = '';
            this.asyncRoutestMark = false;
            this.userInfo = {} as UserInfo;
            this.roleInfo = {} as RoleInfo;
        },
        // asyncRoute
        updateAsyncRoute(list: RouteRecordNormalized[]) {
            this.dynamicRoute = list;
        },
    },
    getters: {
        currentRoute: () => router.currentRoute.value,
        pageTitle: () => router.currentRoute.value.meta.title,
        dictAll: (state) => state.dictList,
        paramsAll: (state) => state.paramsList,
        sourceHttp: (state) => state.sourceHttpOrigin,
        token: (state) => state.userToken,
        roleId: (state) => state.roleInfo?.id,
        permissionListGet: (state) =>
            state.permissionList.filter(
                (item: MenuListItem) =>
                    item.menuType !== '9' && item.menuType !== '10',
            ),
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'VUE3-ADMIN-PUBLIC',
                storage: localStorage,
            },
        ],
    },
});
