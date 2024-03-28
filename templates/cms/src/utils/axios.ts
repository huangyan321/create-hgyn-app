import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { ResultEnum } from '@/enums/httpEnum';
import { ErrorPageNameMap } from '@/enums/pageEnum';
import { logout, getToken } from '@/utils';
import { ElNotification } from 'element-plus';
import { usePublicStore } from '@/store/modules/public';
import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
} from '@/config/serviceLoading';
import { isDev, getEnvCfg } from '@/utils/utils';

interface AxiosRequestConfigPro extends AxiosRequestConfig {
    hideLoading?: boolean;
}
tryHideFullScreenLoading();
const CancelToken = axios.CancelToken;
// .env环境变量
const BaseUrl = getEnvCfg(isDev(), 'baseUrl');

const DEFAULT_HIDE_LOADING = false;
class HttpRequest {
    axiosInstance: AxiosInstance;
    hideLoading: boolean;
    constructor(config: AxiosRequestConfigPro) {
        this.hideLoading = DEFAULT_HIDE_LOADING;
        this.axiosInstance = axios.create(config);
        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfigPro) => {
                const token: string = getToken();
                const publicStore = usePublicStore();
                config.cancelToken = new CancelToken((cancel) => {
                    publicStore.source._axiosPromiseCancel.push(cancel);
                });
                const noTokenUrls = [
                    'system/sysUser/login',
                    'system/sysParam/querySysParamByParamKey',
                ];
                if (!noTokenUrls.includes(config.url!) && !token) {
                    logout();
                    return;
                }
                config.headers ? (config.headers.token = token) : '';
                !this.hideLoading && showFullScreenLoading();
                return config;
            },
            (error: AxiosRequestConfigPro) => {
                ElNotification.error('服务已断开!');
                Promise.reject(error);
            },
        );
        this.axiosInstance.interceptors.response.use(
            (res: AxiosResponse) => {
                // * 在请求结束后，并关闭请求 loading
                tryHideFullScreenLoading();
                const { code } = res.data as { code: number };
                if (code === ResultEnum.SUCCESS)
                    return Promise.resolve(res.data);
                // token过期
                if (ErrorPageNameMap.get(code) === '403') {
                    logout();
                    return Promise.resolve(res.data);
                }
                ElNotification.error(res.data.message || '服务已断开!');
                return Promise.reject(new Error(res.data.message));
            },
            (err: AxiosResponse) => {
                tryHideFullScreenLoading();
                // 终结promise链
                if (axios.isCancel(err)) {
                    return new Promise(() => '');
                }
                ElNotification.error('服务已断开!');
                return Promise.reject(err);
            },
        );
    }
    request<T>(config: AxiosRequestConfigPro): Promise<T> {
        return new Promise((resolve, reject) => {
            this.hideLoading = !!config.hideLoading;
            this.axiosInstance
                .request<T>(config)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => reject(err));
        });
    }
    // * 常用请求方法封装
    get<T>(
        url: string,
        params?: object,
        _object = {},
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get(url, { params, ..._object });
    }
    post<T>(
        url: string,
        params?: object,
        _object = {},
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post(url, params, _object);
    }
    put<T>(
        url: string,
        params?: object,
        _object = {},
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put(url, params, _object);
    }
    delete<T>(
        url: string,
        params?: any,
        _object = {},
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete(url, { params, ..._object });
    }
}
const httpRequest = new HttpRequest({
    baseURL: BaseUrl,
    timeout: ResultEnum.TIMEOUT,
});
export default httpRequest.request.bind(httpRequest);
export { httpRequest };
