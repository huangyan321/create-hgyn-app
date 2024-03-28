import API from '@/api';
import { findKey } from 'lodash-es';
const localeMap = {
    1: 'zh-CN',
    2: 'zh-TW',
    3: 'en',
};

export const useLocaleStore = defineStore('locale', () => {
    const currentLocale = ref('zh-CN');
    const paramData = ref<
        Partial<{ id: number; paramKey: string; paramValue: string }>
    >({});
    // 获取系统参数得到当前设置的语言
    const queryCurrentLocale = async () => {
        await API.querySysParamByParamKey({
            paramKey: 'SYSTEM_LANGUAGE',
        })
            .then(({ data }: { data: any }) => {
                paramData.value = data;
                const systemLanguage = localeMap[data?.paramValue ?? '1'];
                currentLocale.value = systemLanguage;
            })
            .catch(() => {
                // 如果获取失败，就默认中文
                currentLocale.value = 'zh-CN';
            });
    };
    const setCurrentLocale = async (locale: string) => {
        // 通过反向查找，获取到对应的key
        const key = findKey(localeMap, (item) => item === locale);
        const saveParams = { ...paramData.value, paramValue: key };
        await API.updateSysParamByParamKeyParams(saveParams);
    };
    return {
        currentLocale,
        queryCurrentLocale,
        setCurrentLocale,
    };
});
