import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import router, { setupRouter } from '@/router';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:uno.css'
import '@/style/app.scss';
import '@/assets/svg/iconfont.js'; //svg全局引入
import { setupSvgIcon } from './plugin/SvgIcon/index';
// custom directives
import directives from '@/directives/index';
import i18n from '@/locales';
import { PageEnum } from '@/enums/pageEnum';
import * as baseRouter from '@/router/base';
import modules from '@/router/modules';
import { RouteRecordRaw } from 'vue-router';
import { useLocaleStore } from './store/modules/locale';

async function appInit() {
    const app = createApp(App);
    // 注册SVG
    setupSvgIcon(app);

    // 注册element-plus icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }

    app.use(i18n);
    // 挂载依赖
    app.use(store);
    const localeStore = useLocaleStore();
    await localeStore.queryCurrentLocale();
    // 挂载指令
    app.use(directives);
    // 挂载路由
    const RootRoute: Array<RouteRecordRaw> = [
        {
            path: '',
            name: 'Root',
            redirect: PageEnum.BASE_HOME,
            component: () => import('@/layout/index.vue'),
            meta: {
                title: 'admin-template',
            },
            children: Object.values(modules),
        },
    ];
    const routes = [...Object.values(baseRouter), ...RootRoute];
    setupRouter(app, routes);

    // 路由准备就绪后挂载APP实例
    await router.isReady();
    app.use(ElementPlus, { size: 'default', zIndex: 3000 }).mount('#app');

    // 挂载到 window
    window['$vue'] = app;
}
void appInit();
