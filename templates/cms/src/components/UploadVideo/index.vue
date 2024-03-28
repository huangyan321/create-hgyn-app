<script lang="tsx">
import uploader from 'vue-simple-uploader';
import 'vue-simple-uploader/dist/style.css';
import { defineComponent, computed, h } from 'vue';
import video from '@/assets/usual/video.png';
import { ElIcon } from 'element-plus';
import { Close } from '@element-plus/icons-vue';
import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
} from '@/config/serviceLoading';
export default defineComponent({
    props: {
        action: {
            type: String,
            default: '',
        },
        query: {
            type: Object,
            default: () => ({}),
        },
        headers: {
            type: Object,
            default: () => ({}),
        },
        chunkSize: {
            type: [Number, String],
            default: '2048000',
        },
        fileList: {
            type: Array,
            default: () => [],
        },
        isShowBtn: {
            type: Boolean,
            default: false,
        },
        deleteFile: {
            type: () => ({}),
            default: () => ({}),
        },
    },
    emits: ['handleSuccess'],
    setup(props, { emit }) {
        const options = computed(() => ({
            //目标上传 URL，默认POST, import.meta.env.VITE_API_URL = api
            // target ==》http://localhost:6666/api/uploader/chunk
            target: props.action,
            query: props.query,
            headers: props.headers,
            //分块大小(单位：字节)
            chunkSize: props.chunkSize,
            //上传文件时文件内容的参数名，对应chunk里的Multipart对象名，默认对象名为file
            fileParameterName: 'file',
            //失败后最多自动重试上传次数
            maxChunkRetries: 3,
            //是否开启服务器分片校验，对应GET类型同名的target URL
            testChunks: false,
            allowDuplicateUploads: true,
            initFileFn: function () {
                showFullScreenLoading();
            },
            // 服务器分片校验函数
            checkChunkUploadedByResponse: function (
                file: any,
                response_msg: string,
            ) {
                tryHideFullScreenLoading();
                let objMessage = JSON.parse(response_msg);
                emit('handleSuccess', objMessage, file);
                return false;
            },
        }));
        const attrs = computed(() => ({
            accept: [
                '.mp4',
                '.rmvb',
                '.mkv',
                '.wmv',
                '.flv',
                '.avi',
                '.mpeg',
                '.mov',
                'vob',
            ],
        }));
        const fileStatusText = computed(() => ({
            success: '上传成功',
            error: '上传失败',
            uploading: '上传中',
            paused: '暂停',
            waiting: '等待上传',
        }));

        return () =>
            h(
                uploader.Uploader,
                {
                    ref: 'uploaderRef',
                    options: options.value,
                    autoStart: true,
                    'file-status-text': fileStatusText.value,
                },
                {
                    default: () => [
                        h(uploader.UploaderUnsupport),
                        h(
                            uploader.UploaderDrop,
                            {
                                class: props.isShowBtn ? 'hidden' : '',
                            },
                            {
                                default: () => [
                                    h(uploader.UploaderBtn, {
                                        id: 'global-uploader-btn',

                                        attrs: attrs.value,
                                        single: true,
                                        innerText: '选择文件',
                                    }),
                                ],
                            },
                        ),
                        props.fileList.map((item: any) => {
                            return h(
                                'div',
                                {
                                    class: 'custom-img',
                                    onClick: props.deleteFile,
                                },
                                [
                                    h(
                                        ElIcon,
                                        {
                                            class: 'overlay',
                                        },
                                        {
                                            default: () => [h(Close)],
                                        },
                                    ),
                                    h('img', {
                                        height: '148',
                                        width: '148',
                                        src: video,
                                        class: 'special-img',
                                    }),
                                ],
                            );
                        }),
                        /* h(
                            uploader.UploaderList,
                            {
                                fileList: props.fileList,
                            },
                            {
                                default: () => [],
                            },
                        ), */
                    ],
                },
            );
    },
});
</script>

<style scoped lang="scss">
.uploader {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    border: 1px dashed rgb(43, 104, 110);
    border-radius: 8px;
}
.custom-img {
    width: 148px;
    height: 148px;
    position: relative;
    cursor: pointer;
    &:hover {
        .overlay {
            display: block !important;
        }
    }
    .overlay {
        position: absolute;
        width: 148px;
        height: 148px;
        display: none;
        text-align: center;
        line-height: 148px;
        font-size: 48px;
        font-weight: bold;
        color: #ffffff;
        background: #6666666c;
        z-index: 999;
    }
}
.hidden {
    display: none !important;
}
</style>
