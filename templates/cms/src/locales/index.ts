import { createI18n } from 'vue-i18n';
import messages from './lang/index';
const i18n = createI18n({
    locale: 'zh-CN',
    fallbackLocale: 'zh-CN',
    messages,
    legacy: false,
});
export function $t(key: string) {
    return i18n.global.t(key);
}

export default i18n;
