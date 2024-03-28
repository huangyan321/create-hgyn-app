import router from '@/router';
export default {
    setup() {
        const { params, query } = router.currentRoute.value;
        const { path } = params;
        router.replace({ path: '/' + path, query });
    },
};
