import {
    Router,
    RouteLocationNormalized,
    isNavigationFailure,
} from 'vue-router';
import { usePublicStore } from '@/store/modules/public';
import { useAuthStore } from '@/store/modules/auth';
import NProgress from '@/config/nprogress';
import { LOGIN_URL, ERROR_URL } from '@/config/config';
import { logout } from '@/utils';

/**
 * 前置守卫
 * to: Route对象, 即将跳转到的Route对象
 * from: Route对象,
 * next: 第三个参数可选，vue-router4.x 已经不推荐使用，推荐使用return控制跳转
 */
export const createRouterGuards = (router: Router) => {
    router.beforeEach(
        async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
            NProgress.start();
            const authStore = useAuthStore();
            authStore.setRouteName(to.name as string);
            const publicStore = usePublicStore();
            if (from.path !== '/login') {
                publicStore.source._axiosPromiseCancel.forEach((e) => {
                    e && e();
                });
                publicStore.source._axiosPromiseCancel = [];
            }
            // 未登录
            if (to.path !== LOGIN_URL) {
                if (!publicStore.userInfo?.token) return LOGIN_URL;
            }
            // 不存在的路由
            if (!to.matched.length) {
                // 重复404
                if (from.fullPath.includes('404')) {
                    logout();
                    return LOGIN_URL;
                }
                return ERROR_URL;
            }
            // 前往login
            if (to.path === LOGIN_URL) return;

            // 判断是否有 Token，没有重定向到 login
            if (!publicStore.userInfo?.token) return LOGIN_URL;
        },
    );
    router.afterEach((to, from, failure) => {
        document.title = (to?.meta?.title as string) || document.title;
        if (isNavigationFailure(failure)) {
            console.log(failure);
            return ERROR_URL;
            // window.location.reload();
        }
        NProgress.done();
    });
    // 错误
    router.onError((error) => {
        NProgress.done();
        console.log(error);
    });
};
