import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { createRouterGuards } from './router-guards';

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: [],
    scrollBehavior: () => ({ left: 0, top: 0 }),
    strict: true,
});
export function setupRouter(app: App, routes: RouteRecordRaw[]) {
    routes.forEach(router.addRoute);
    router.addRoute({
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    });
    app.use(router);
    // 创建路由守卫
    createRouterGuards(router);
}
export default router;
