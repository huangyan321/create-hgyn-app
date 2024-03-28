/**
 * v-auth
 * 按钮权限指令
 */
import { authBtnEnum } from '@/enums/btnEnum';
import { useAuthStore } from '@/store/modules/auth';
import { filterSpace } from '@/utils';
import type { Directive, DirectiveBinding } from 'vue';

// 按钮权限
const auth: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        const { value, arg } = binding;
        // 如果value不存在，直接return不做任何处理
        if (!value) return;
        const authStore = useAuthStore();
        const currentRouteRoles = // 当前路由已有的权限
            authStore.authButtonListGet.filter((item: SysRoleBtn) =>
                item.parentMenu.menuUrl.includes(authStore.routeName),
            ) ?? [];
        // 当前路由没有任何权限，则全部涉及到权限的按钮都移除
        if (!currentRouteRoles.length) return el.remove();
        // arg undefined 为一级页面，但凡涉及到二级或者三级页面 都会有arg
        // 有例外, data-admin同步规则配置, 只有一个页面, 但是权限分了四个tab........神奇
        const currentPageRole = currentRouteRoles.find((item) => {
            return arg ? item.tab?.menuName === filterSpace(arg) : true;
        }); // 当前页面的权限，去除别的页面权限的干扰，降低权限判断的复杂度
        // 还有一种情况，权限是tab但是页面只有一级，那就定义一个map，如果所有的tab都不存在当前的按钮，则移除
        // 但凡有一个tab存在当前按钮的权限，就不删除
        const map: { [key: string]: boolean[] } = {};
        // 上面以及拿到当前页面的权限了,判断isTab就能知道是不是tab
        // map的判断逻辑应该是在所有的路由权限里面判断，而不是在当前页面的权限里面判断, 因为当前页面的权限是去除了别的页面的干扰的
        for (let i = 0; i < currentRouteRoles.length; i++) {
            const item = currentRouteRoles[i];
            const btnHasExist = item.buttonList.some(
                (item) => item.menuName === authBtnEnum[value],
            );
            if (item.isTab && !arg) {
                map[value]
                    ? map[value].push(btnHasExist)
                    : (map[value] = [btnHasExist]);
            } else if (!item.isTab) {
                // 一旦当前页面有一个不是tab, 那就代表着当前页面既有tab权限,又有非tab权限
                // 直接break,不需要再判断map了
                // 这种情况就代表着当前页面有一个button权限能够点击并且进入二级页面
                // 也就是说,这个按钮既是button权限,又是tab权限
                // 所以不需要走tab权限的判断逻辑
                // 有点混乱,但目前两个平台看着都没啥bug
                delete map[value];
                break;
            }
        }
        if (map[value])
            return map[value].every((item) => !item) ? el.remove() : null;
        if (currentPageRole) {
            const btnHasExist = currentPageRole.buttonList.some(
                (item) => item.menuName === authBtnEnum[value],
            );
            if (btnHasExist) return;
            el.remove();
        } else el.remove();
    },
};

export default auth;
