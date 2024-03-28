import screenfull from 'screenfull';
import Image_404 from '@/assets/404_images/404.png';
import html2canvas from 'html2canvas';
import { downloadByA } from './file';
import { toString } from './type';
import { cloneDeep, throttle } from 'lodash-es';
import {
    RequestHttpIntervalEnum,
    RequestParamsObjType,
} from '@/enums/httpEnum';
import { useUserStore } from '@/store/modules/user';
import { isArray } from '@/utils/is';
/**
 * * 获取存储的token
 * @return { String }
 */
export const getToken = () => {
    const userStore = useUserStore();
    return userStore.getUserToken;
};
/**
 * * 判断是否是开发环境
 * @return { Boolean }
 */
export const isDev = () => {
    const devHost = ['127.0.0.1', 'localhost'];
    return devHost.includes(window.location.hostname) ? 'dev' : 'pro';
    // return import.meta.env.DEV;
};
/**
 * * 获取环境变量
 * @param {String} env 环境
 * @param {String} key 参数
 * @return { String }
 */
export const getEnvCfg = (env: string, key: string) => {
    const obj = {
        dev: {
            baseUrl: import.meta.env.VITE_API_BASE_URL,
            iotUrl: import.meta.env.VITE_IOT_BASE_URL,
        },
        pro: {
            baseUrl: `http://${window.location.hostname}:9907/shs/`,
            iotUrl: `http://${window.location.hostname}:8101/`,
        },
    };
    return obj[env][key] || '';
};
/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
    return Number(
        Math.random().toString().substring(2, randomLength) + Date.now(),
    ).toString(36);
};

/**
 * * 获取错误处理图片，默认 404 图
 * @returns url
 */
export const requireErrorImg = () => {
    return Image_404;
};

/**
 * * 全屏操作函数
 * @param isFullscreen
 * @param isEnabled
 * @returns
 */
export const screenfullFn = (isFullscreen?: boolean, isEnabled?: boolean) => {
    // 是否是全屏
    if (isFullscreen) return screenfull.isFullscreen;

    // 是否支持全屏
    if (isEnabled) return screenfull.isEnabled;

    if (screenfull.isEnabled) {
        screenfull.toggle();
        return;
    }
    window['$message'].warning('您的浏览器不支持全屏功能！');
};

/**
 * * 设置元素属性
 * @param HTMLElement 元素
 * @param key 键名
 * @param value 键值
 */
export const setDomAttribute = <
    K extends keyof CSSStyleDeclaration,
    V extends CSSStyleDeclaration[K],
>(
    HTMLElement: HTMLElement,
    key: K,
    value: V,
) => {
    if (HTMLElement) {
        HTMLElement.style[key] = value;
    }
};

/**
 * * 判断是否是 mac
 * @returns boolean
 */
export const isMac = () => {
    return /macintosh|mac os x/i.test(navigator.userAgent);
};

/**
 * * file转url
 */
export const fileToUrl = (file: File): string => {
    const Url = URL || window.URL || window.webkitURL;
    const ImageUrl = Url.createObjectURL(file);
    return ImageUrl;
};

/**
 * * file转base64
 */
export const fileTobase64 = (file: File, callback: (e: unknown) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target) {
            const base64 = e.target.result;
            callback(base64);
        }
    };
};

/**
 * * 挂载监听
 */
// eslint-disable-next-line no-undef
export const addEventListener = <K extends keyof WindowEventMap>(
    target: HTMLElement | Document,
    type: K,
    listener: any,
    delay?: number,
    // eslint-disable-next-line no-undef
    options?: boolean | AddEventListenerOptions | undefined,
) => {
    if (!target) return;
    target.addEventListener(
        type,
        throttle(listener, delay || 300, {
            leading: true,
            trailing: false,
        }),
        options,
    );
};

/**
 * * 卸载监听
 */
// eslint-disable-next-line no-undef
export const removeEventListener = <K extends keyof WindowEventMap>(
    target: HTMLElement | Document,
    type: K,
    listener: any,
) => {
    if (!target) return;
    target.removeEventListener(type, listener);
};

/**
 * * 截取画面为图片并下载
 * @param html 需要截取的 DOM
 */
export const canvasCut = (html: HTMLElement | null, callback?: () => void) => {
    if (!html) {
        window['$message'].error('导出失败！');
        if (callback) callback();
        return;
    }

    html2canvas(html, {
        backgroundColor: null,
        allowTaint: true,
        useCORS: true,
    }).then((canvas: HTMLCanvasElement) => {
        window['$message'].success('导出成功！');
        downloadByA(canvas.toDataURL(), undefined, 'png');
        if (callback) callback();
    });
};

/**
 * * 函数过滤器
 * @param data 数据值
 * @param res 返回顶级对象
 * @param funcStr 函数字符串
 * @param isToString 是否转为字符串
 * @param errorCallBack 错误回调函数
 * @param successCallBack 成功回调函数
 * @returns
 */
export const newFunctionHandle = (
    data: any,
    res: any,
    funcStr?: string,
    isToString?: boolean,
    errorCallBack?: (e: unknown) => void,
    successCallBack?: (e: unknown) => void,
) => {
    try {
        if (!funcStr) return data;
        const fn = new Function('data', 'res', funcStr);
        const fnRes = fn(cloneDeep(data), cloneDeep(res));
        const resHandle = isToString ? toString(fnRes) : fnRes;
        // 成功回调
        successCallBack && successCallBack(resHandle);
        return resHandle;
    } catch (error) {
        // 失败回调
        errorCallBack && errorCallBack(error);
        return '函数执行错误';
    }
};

/**
 * * 处理请求事件单位
 * @param num 时间间隔
 * @param unit RequestHttpIntervalEnum
 * @return number 秒数
 */
export const intervalUnitHandle = (
    num: number,
    unit: RequestHttpIntervalEnum,
) => {
    switch (unit) {
        // 秒
        case RequestHttpIntervalEnum.SECOND:
            return num * 1000;
        // 分
        case RequestHttpIntervalEnum.MINUTE:
            return num * 1000 * 60;
        // 时
        case RequestHttpIntervalEnum.HOUR:
            return num * 1000 * 60 * 60;
        // 天
        case RequestHttpIntervalEnum.DAY:
            return num * 1000 * 60 * 60 * 24;
        default:
            return num * 1000;
    }
};

/**
 * * 对象转换 cookie 格式
 * @param obj
 * @returns string
 */
export const objToCookie = (obj: RequestParamsObjType) => {
    if (!obj) return '';

    let str = '';
    for (const key in obj) {
        str += key + '=' + obj[key] + ';';
    }
    return str.substring(0, str.length - 1);
};
/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (isArray(callValue))
        return callValue.length ? callValue.join(' / ') : '--';
    return callValue ?? '--';
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(
    row: { [key: string]: any },
    prop: string,
) {
    if (!prop.includes('.')) return row[prop];
    prop.split('.').forEach((item) => {
        row = row[item] ?? '--';
    });
    return row;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
    const propArr = prop.split('.');
    if (propArr.length == 1) return prop;
    return propArr[propArr.length - 1];
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
    callValue: any,
    enumData: { [key: string]: any } | undefined,
    searchProps?: { [key: string]: any },
    type?: string,
): string {
    const value = searchProps?.value ?? 'value';
    const label = searchProps?.label ?? 'label';
    let filterData: any = {};
    if (Array.isArray(enumData))
        filterData = enumData.find((item: any) => item[value] === callValue);
    if (type == 'tag') return filterData?.tagType ? filterData.tagType : '';
    return filterData ? filterData[label] : '--';
}
/**
 *
 * @param e 需要处理的字符串
 * @returns 删除末尾逗号的结果
 */
export function filterSubstring(e: string) {
    if (!e) return e;
    e[e.length - 1] === ',' ? (e = e.substring(0, e.length - 1)) : '';
    return e;
}
/**
 *
 * @param data 菜单数据
 * @returns 树形菜单数据 <RouteTreeType>
 */
export function flatTreeData(data: menuInfo[]) {
    if (!data) return [];
    // 递归根据id和parentId生成树形结构
    const tree = (data: menuInfo[], parentId: number) => {
        const arr: RouteTreeType[] = [];
        data.forEach((item) => {
            const json: RouteTreeType = {
                id: item.id,
                icon: item.menuIcon,
                name: item.menuName,
                url: item.menuUrl,
                parentId: item.parentId,
                sort: item.sort,
                children: [],
            };
            if (
                item.parentId === parentId &&
                (item.menuType === '1' ||
                    item.menuType === '2' ||
                    item.menuType === '3')
            ) {
                const children = tree(data, item.id);
                if (children.length) {
                    json.children = children;
                }
                arr.push(json);
            }
        });
        return arr;
    };
    return tree(data, 0);
}
/**
 *
 * @param aimKey  目标数据判断key 如id
 * @param originKey 比对数据判断key 如parentID
 * @param parent 目标数据json
 * @param child  比对数据json
 */
export function flatCheckChild(
    aimKey: string,
    originKey: string,
    parent: any[],
    child: any[],
) {
    parent.map((item: any) => {
        if (item[aimKey] === child[originKey]) {
            !item.children ? (item.children = []) : '';
            item.children!.push(child);
        } else {
            item.children?.length
                ? flatCheckChild(aimKey, originKey, item.children, child)
                : '';
        }
    });
}
/**
 *
 * @param aimKey  目标数据判断key 如id
 * @param originKey 比对数据判断key 如parentID
 * @param aimArray 目标数据数组
 * @param originArray  比对数据数组
 * @describe 调用后自动处理数据为树形数据 自动添加children属性
 */
export function flatTreeDataSource(
    aimKey: string,
    originKey: string,
    aimArray: any[],
    originArray: any[],
) {
    aimArray.map((item: any) => {
        originArray.map((items: any) => {
            if (item[aimKey] === items[originKey]) {
                !item.children ? (item.children = []) : '';
                item.children!.push(items);
            } else {
                item.children?.length
                    ? flatCheckChild(aimKey, originKey, item.children, items)
                    : '';
            }
        });
    });
}

/**
 *
 * @param str 需要处理的字符串
 * @returns str 去除空格的数据
 */
export function filterSpace(str: string | undefined) {
    if (!str) return '';
    return str.replace(/\s*/g, '');
}
/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
    if (val === null) return 'null';
    if (typeof val !== 'object') return typeof val;
    else
        return Object.prototype.toString
            .call(val)
            .slice(8, -1)
            .toLocaleLowerCase();
}
/**
 * Perform no operation.
 */
export function noop() {
    return void 0;
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat?: any) {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (typeof time === 'string') {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/');
            }
        }

        if (typeof time === 'number' && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const time_str = format.replace(
        /{([ymdhisa])+}/g,
        (result: any, key: any) => {
            const value = formatObj[key];
            // Note: getDay() returns 0 on Sunday
            if (key === 'a') {
                return ['日', '一', '二', '三', '四', '五', '六'][value];
            }
            return value.toString().padStart(2, '0');
        },
    );
    return time_str;
}
