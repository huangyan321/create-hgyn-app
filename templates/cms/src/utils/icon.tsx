import { h, createVNode } from 'vue';
import * as eIcons from '@element-plus/icons-vue';
export const getIconVNode = (e: string) => {
    if (!e) return;
    const vnode = h(
        <el-icon v-show={e}></el-icon>,
        { size: '24px' },
        {
            default: () => [createVNode(eIcons[e])],
        },
    );
    return vnode;
};
