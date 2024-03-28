import { mount } from '@vue/test-utils';
import Dialog from '@/components/Dialog/index.vue';
import { expect, it, describe } from 'vitest';

describe('Dialog', () => {
    const wrapper = mount(Dialog, {
        props: {
            title: '编辑表单',
            width: '70%',
        },
    });
    it('snapeShot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
    it('props', () => {
        expect(wrapper.props().title).toBe('编辑表单');
        expect(wrapper.props().width).toBe('70%');
    });
});
