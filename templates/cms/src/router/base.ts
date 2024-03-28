import { PageEnum } from '@/enums/pageEnum';
import { Layout } from '@/router/constant';
import { RouteRecordRaw } from 'vue-router';
export const MainRoute: RouteRecordRaw = {
    path: '/main',
    name: 'main',
    component: Layout,
    redirect: '/main',
    meta: {
        title: '主页',
        requireAuth: false,
    },
    children: [
        {
            path: '/main',
            name: 'main',
            component: () => import('@/pages/main/index.vue'),
        },
    ],
};
export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
        title: '登录',
        requireAuth: false,
    },
};

export const RedirectRoute: RouteRecordRaw = {
    path: PageEnum.REDIRECT,
    name: PageEnum.REDIRECT_NAME,
    component: Layout,
    meta: {
        title: PageEnum.REDIRECT_NAME,
        requireAuth: true,
        isPermission: true,
    },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: PageEnum.REDIRECT_NAME,
            component: () => import('@/pages/redirect/index.vue'),
            meta: {
                title: PageEnum.REDIRECT_NAME,
                hideBreadcrumb: true,
            },
        },
    ],
};

export const ReloadRoute: RouteRecordRaw = {
    path: PageEnum.RELOAD,
    name: PageEnum.RELOAD_NAME,
    component: () => import('@/components/Reload/index.vue'),
    meta: {
        title: PageEnum.RELOAD_NAME,
        requireAuth: false,
    },
};
/**
 * errorRouter(错误页面路由)
 */
export const error403Router: RouteRecordRaw = {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorMessage/403.vue'),
    meta: {
        title: '403页面',
        requireAuth: false,
    },
};
export const error404Router: RouteRecordRaw = {
    path: '/404',
    name: '404',
    component: () => import('@/components/ErrorMessage/404.vue'),
    meta: {
        title: '404页面',
        requireAuth: false,
    },
};
export const error500Router: RouteRecordRaw = {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorMessage/500.vue'),
    meta: {
        title: '500页面',
        requireAuth: false,
    },
};
