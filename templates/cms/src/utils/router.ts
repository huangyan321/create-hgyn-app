import { usePublicStore } from '@/store/modules/public';
import { useRoute } from 'vue-router';
import { ResultEnum } from '@/enums/httpEnum';
import { ErrorPageNameMap, PageEnum } from '@/enums/pageEnum';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { ElNotification } from 'element-plus';
import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
} from '@/config/serviceLoading';
/**
 * * 403返回登录
 * @param ''
 */
export const logout = () => {
    const userStore = useUserStore();
    const publicStore = usePublicStore();
    userStore.logout();
    publicStore.resetToken();
    router.push({
        name: 'login',
    });
    ElNotification.error('登陆已过期！请重新登录！');
    showFullScreenLoading();
    tryHideFullScreenLoading();
    setTimeout(() => {
        window.location.reload();
    }, 500);
};

/**
 * * 根据名字跳转路由
 * @param pageName
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByName = (pageName: string, isReplace?: boolean) => {
    if (isReplace) {
        router.replace({
            name: pageName,
        });
        return;
    }
    router.push({
        name: pageName,
    });
};

/**
 * * 根据名称获取路由信息
 * @param pageName
 * @param pageName
 */
export const fetchPathByName = (pageName: string, p?: string) => {
    try {
        const pathData = router.resolve({
            name: pageName,
        });
        return p ? (pathData as any)[p] : pathData;
    } catch (error) {
        window['$message'].warning('查询路由信息失败，请联系管理员！');
    }
};

/**
 * * 根据路径跳转路由
 * @param path
 * @param query
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByPath = (
    path: string,
    query?: Array<string | number>,
    isReplace?: boolean,
    windowOpen?: boolean,
) => {
    let fullPath = '';
    if (query?.length) {
        fullPath = `${path}/${query.join('/')}`;
    }
    if (windowOpen) {
        return openNewWindow(fullPath);
    }
    if (isReplace) {
        router.replace({
            path: fullPath,
        });
        return;
    }
    router.push({
        path: fullPath,
    });
};

/**
 * * 错误页重定向
 * @param icon
 * @returns
 */
export const redirectErrorPage = (code: ResultEnum) => {
    if (!code) return false;
    const pageName = ErrorPageNameMap.get(code);
    if (!pageName) return false;
    routerTurnByName(pageName);
};

/**
 * * 重新加载当前路由页面
 */
export const reloadRoutePage = () => {
    routerTurnByName(PageEnum.RELOAD_NAME);
};

/**
 * * 新开页面
 * @param url
 */
export const openNewWindow = (url: string) => {
    return window.open(url, '_blank');
};

/**
 * * 判断是否是预览页
 * @returns boolean
 */
export const isPreview = () => {
    return document.location.hash.includes('preview');
};

/**
 * * 获取当前路由下的参数
 * @returns object
 */
export const fetchRouteParams = () => {
    try {
        const route = useRoute();
        return route.params;
    } catch (error) {
        window['$message'].warning('查询路由信息失败，请联系管理员！');
    }
};

/**
 * * 通过硬解析获取当前路由下的参数
 * @returns object
 */
export const fetchRouteParamsLocation = () => {
    try {
        return document.location.hash.split('/').pop() || '';
    } catch (error) {
        window['$message'].warning('查询路由信息失败，请联系管理员！');
        return '';
    }
};

/**
 * * 回到主页面
 * @param confirm
 */
export const goHome = () => {
    routerTurnByName(PageEnum.BASE_HOME_NAME);
};
