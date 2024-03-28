import { ElLoading } from 'element-plus';

/* 全局请求 loading(服务方式调用) */
let loadingInstance: ReturnType<typeof ElLoading.service>;

const startLoading = () => {
    loadingInstance = ElLoading.service({
        fullscreen: true,
        lock: false,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
    });
};
const endLoading = () => {
    loadingInstance?.close();
};

// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export const showFullScreenLoading = () => {
    endLoading();
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
};

export const tryHideFullScreenLoading = () => {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
};
