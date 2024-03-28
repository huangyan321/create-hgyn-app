/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import viteCompression from 'vite-plugin-compression';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import ElementPlus from 'unplugin-element-plus/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

function pathResolve(dir: string) {
    return path.resolve(process.cwd(), '.', dir);
}
// detail in https://vitejs.dev/config/
export default defineConfig({
    base: './',
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    test: {
        environment: 'happy-dom',
        globals: true,
        clearMocks: true,
        transformMode: {
            web: [/\.[jt]sx$/],
        },
        // important
        deps: {
            inline: ['element-plus'],
        },
    },

    resolve: {
        //设置别名
        alias: [
            {
                find: /\/#\//,
                replacement: pathResolve('types'),
            },
            {
                find: '@',
                replacement: pathResolve('src'),
            },
            {
                find: '~',
                replacement: pathResolve('src/assets'),
            },
            {
                find: '@test',
                replacement: pathResolve('__test__'),
            },
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/style/modules/element.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        UnoCSS(),
        // ElementPlus({}),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            dts: true,
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            extensions: ['vue', 'md'],
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        }),
        // 压缩
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
        vueJsx(),
        legacy({
            targets: ['chrome 93'],
            // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            // renderLegacyChunks: true,
            // polyfills: [
            //     'es.symbol',
            //     'es.array.filter',
            //     'es.promise',
            //     'es.promise.finally',
            //     'es/map',
            //     'es/set',
            //     'es.array.for-each',
            //     'es.object.define-properties',
            //     'es.object.define-property',
            //     'es.object.get-own-property-descriptor',
            //     'es.object.get-own-property-descriptors',
            //     'es.object.keys',
            //     'es.object.to-string',
            //     'web.dom-collections.for-each',
            //     'esnext.global-this',
            //     'esnext.string.match-all',
            // ],
        }),
    ],
    server: {
        port: 9000, // 启动端口
        cors: true, // 允许跨域
        open: false, // 自动开启
        // 设置 https 代理
        proxy: {
            '/api': {
                target: 'http://192.168.96.109:9902',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        outDir: './dist',
        // target: 'es2015',
        assetsInlineLimit: 4096,
        cssCodeSplit: true, //默认true, CSS代码拆分
        sourcemap: process.env.NODE_ENV === 'development',
        minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
        terserOptions: {
            compress: {
                drop_console: process.env.NODE_ENV === 'production', // 生产环境去除console
                drop_debugger: process.env.NODE_ENV === 'production', // 生产环境去除debugger
            },
        },
    },
});
