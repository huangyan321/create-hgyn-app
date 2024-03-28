<template>
    <video
        v-if="visible"
        ref="videoPlayer"
        class="video-js"
        controls
        autoplay
    ></video>
</template>

<script lang="ts" setup name="VideoPlayer">
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type { VideoJsPlayerOptions } from 'video.js';
import 'videojs-flvjs-es6';
// import 'videojs-contrib-hls';
import {
    reactive,
    watch,
    computed,
    onMounted,
    onBeforeUnmount,
    ref,
} from 'vue';

const props = defineProps({
    width: {
        type: [String, Number],
        default: 980,
    },
    height: {
        type: [String, Number],
        default: 540,
    },
    visible: {
        type: Boolean,
        default: true,
    },
    src: {
        type: String,
        required: true,
        default: '',
    },
    type: {
        type: String,
        validator: function (value: string) {
            return ['hls', 'flv', 'artc', 'rtmp'].includes(value);
        },
        default: 'hls',
    },
    timeupdateHandler: {
        type: () => ({}),
        default: () => ({}),
    },
    videoPlayHandler: {
        type: () => ({}),
        default: () => ({}),
    },
    videoEndedHandler: {
        type: () => ({}),
        default: () => ({}),
    },
    videoWaitingHandler: {
        type: () => ({}),
        default: () => ({}),
    },
    videoErrorHandler: {
        type: () => ({}),
        default: () => ({}),
    },
    options: {
        type: Object,
        default: () => ({}),
    },
});
const state = reactive<{
    player: videojs.Player | null;
    playerElement: HTMLElement | null;
    MIMEType: {
        hls: string;
        flv: string;
        artc: string;
        rtmp: string;
    };
}>({
    player: null,
    playerElement: null,
    MIMEType: {
        hls: 'application/x-mpegURL',
        flv: 'video/x-flv',
        artc: 'application/webrtc',
        rtmp: 'application/x-fcs',
    },
});

const videoPlayer = ref();

watch(
    () => props.width,
    (e) => {
        state.playerElement!.style.width = e + 'px';
    },
);
watch(
    () => props.height,
    (e) => {
        state.playerElement!.style.height = e + 'px';
    },
);
watch(
    () => props.src,
    (e) => {
        state.player && state.player.src(e);
    },
);

const playerOptions = computed(() => {
    const options: { flvjs: any } & VideoJsPlayerOptions = {
        width:
            typeof props.width === 'number'
                ? props.width
                : parseInt(props.width),
        height:
            typeof props.height === 'number'
                ? props.height
                : parseInt(props.height),
        autoplay: false, // 是否自动开始播放
        controls: true, // 是否显示播放器控件
        language: 'zh-CN', // 初始语言
        techOrder: ['html5', 'flvjs', 'flash'], //播放器使用的媒体技术的优先级顺序
        preload: 'auto', // 媒体的预加载行为 可选值包括’auto’、‘none’和’metadata’
        poster: '', // 播放器媒体资源的封面图片
        loop: false, // 是否重播
        muted: false, // 是否启用静音
        fluid: false, // 是否启用流体布局，自动响应媒体容器大小的改变具有100%的宽度
        responsive: false, // 是否启用响应式设计，自动根据页面布局的宽度进行调整
        plugins: {}, // 插件
        html5: {
            nativeVideoTracks: false, // 是否启用原生video轨道
            nativeAudioTracks: false, // 是否启用原生的音频轨道
            nativeTextTracks: false,
            // HLS流媒体播放器的设置
            vhs: {
                withCredentials: false, //  是否发送凭据(如cookie、请求头部等)
                enableLowInitialPlaylist: true, // 决定是否使用低起始码率，以避免播放时缓冲过长的问题
                // smoothQualityChange: true, // 决定是否平滑切换质量，避免播放停顿
                overrideNative: true, // 是否覆盖浏览器内置的 HLS 实现
                cacheEncryptionJobs: false, //  是否为加密数据缓存加密后的数据流。
                handleManifestRedirects: true, // 是否将 manifest 重定向作为主流名称
            },
        },
        flvjs: {
            mediaDataSource: {
                type: 'flv',
                isLive: true,
                cors: true,
                withCredentials: false,
            },
        },

        sources: [
            {
                src: props.src,
                type: state.MIMEType[props.type],
            },
        ],
    };
    return Object.assign(options, props.options);
});
const videoPlayerStyles = computed(() => {
    return {
        width: props.width || '100%',
        height: props.height || '100%',
    };
});
onMounted(() => {
    props.visible && initVideo();
}),
    onBeforeUnmount(() => {
        // 销毁视频播放器实例
        if (state.player) {
            state.player.dispose();
        }
    });

const initVideo = () => {
    state.player = videojs(videoPlayer.value, playerOptions.value, function () {
        console.log('视频已准备好');
    });
    state.playerElement = state.player.el() as HTMLElement;
    // 监听播放时间更新
    state.player.on(
        'timeupdate',
        props.timeupdateHandler as (...args: any[]) => void,
    );
    // 视频开始播放时调用
    state.player.on('play', props.videoPlayHandler as (...args: any[]) => void);
    // 视频播放完毕时调用
    state.player.on(
        'ended',
        props.videoEndedHandler as (...args: any[]) => void,
    );
    // 视频播放等待时调用
    state.player.on(
        'waiting',
        props.videoWaitingHandler as (...args: any[]) => void,
    );
    // 视频播放错误时调用
    state.player.on(
        'error',
        props.videoErrorHandler as (...args: any[]) => void,
    );
};
</script>
