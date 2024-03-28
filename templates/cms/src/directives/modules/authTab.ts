/**
 * v-auth
 *  tab权限指令
 */
import { useAuthStore } from '@/store/modules/auth';
import type { Directive, DirectiveBinding } from 'vue';
import { authTabEnum } from '@/enums/btnEnum';
import { filterSpace } from '@/utils/utils';
// tab权限
const authTab: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value } = binding;
        const authStore = useAuthStore();
        const currentPageRoles =
            authStore.authButtonListGet.filter(
                (item: SysRoleBtn) =>
                    item.parentMenu.menuUrl.includes(authStore.routeName) &&
                    item.isTab,
            ) ?? [];
        // tab页
        const hasTab = currentPageRoles.filter(
            (item: SysRoleBtn) => item.tab?.menuName === value,
        );
        // console.log(el);
        // el.remove();
        if (!hasTab || !hasTab.length) {
            el.remove();
            return;
        }
    },
};
const authFilter = (list: IDict[]) => {
    const authStore = useAuthStore();
    const currentPageRoles =
        authStore.authButtonListGet.filter(
            (item: SysRoleBtn) =>
                item.parentMenu.menuUrl.includes(authStore.routeName) &&
                item.isTab,
        ) ?? [];
    const data = list
        .map((item: IDict) => {
            let e = false; // 是否存在该tab
            currentPageRoles.filter((items: SysRoleBtn) => {
                if (
                    filterSpace(item.dictValue) ===
                    filterSpace(items.tab?.menuName)
                ) {
                    e = true;
                }
            });
            if (!e) {
                return '';
            }
            return item;
        })
        .filter((item) => item);
    return data;
};
export { authFilter };
export default authTab;
