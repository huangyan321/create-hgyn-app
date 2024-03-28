export enum EnableEnum {
    // 是否启用
    IS_ENABLE_OPEN = '是',
    IS_ENABLE_CLOSE = '否',
}
export const EnableEnumMap = new Map([
    ['1', EnableEnum.IS_ENABLE_OPEN],
    ['0', EnableEnum.IS_ENABLE_CLOSE],
]);
export enum MenuEnum {
    // 菜单类型
    MENU_TYPE_F = '一级菜单',
    MENU_TYPE_S = '二级菜单',
    MENU_TYPE_T = '三级菜单',
    MENU_TYPE_TAB = 'tab页',
    MENU_TYPE_BTN = '操作按钮',
}
// 菜单类型
export const MenuEnumMap = new Map([
    ['1', MenuEnum.MENU_TYPE_F],
    ['2', MenuEnum.MENU_TYPE_S],
    ['3', MenuEnum.MENU_TYPE_F],
    ['9', MenuEnum.MENU_TYPE_TAB],
    ['10', MenuEnum.MENU_TYPE_BTN],
]);
// 菜单标签
export const MenuTypeEnumMap = new Map([
    ['1', ''],
    ['2', 'success'],
    ['3', 'warning'],
    ['9', 'info'],
    ['10', 'danger'],
]);
