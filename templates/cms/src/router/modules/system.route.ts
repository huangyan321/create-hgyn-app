import { RouteRecordRaw } from 'vue-router';
import { SysEnum } from '@/enums/pageEnum';

const sysRoutes: RouteRecordRaw = {
    path: SysEnum.SYS_HOME,
    name: SysEnum.SYS_HOME_NAME,
    redirect: SysEnum.MENU_HOME,
    meta: {
        title: '系统管理',
        isRoot: true,
        keepAlive: false,
        requireAuth: true,
        isPermission: false,
    },
    children: [
        {
            path: SysEnum.MENU_HOME,
            name: SysEnum.MENU_HOME_NAME,
            component: () => import('@/pages/system/menu/index.vue'),
            meta: {
                title: '菜单管理',
                keepAlive: false,
                isPermission: false,
            },
        },
    ],
};

export default sysRoutes;
