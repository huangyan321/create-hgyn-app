import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { defineComponent } from 'vue';

declare type Recordable<T = any> = Record<string, T>;

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string;
    meta: RouteMeta;
    component?: Component | string;
    components?: Component;
    children?: AppRouteRecordRaw[];
    props?: Recordable;
    fullPath?: string;
}

export interface Meta {
    // 名称
    title: string;
    // 是否忽略权限
    ignoreAuth?: boolean;
    permissions?: string[];
    // 是否缓存
    keepAlive?: boolean;
    // 是否固定在tab上
    affix?: boolean;
    // tab上的图标
    icon?: string;
    // 跳转地址
    frameSrc?: string;
    // 外链跳转地址
    externalLink?: string;
    //隐藏
    hidden?: boolean;
}
