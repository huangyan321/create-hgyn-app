/** @format */

import { defineConfig } from 'rollup';
import ts from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import polyfillNode from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
export default defineConfig({
  input: ['src/cli.ts', 'src/index.ts'],
  output: {
    /** 输出目录 */
    dir: './dist',
    /** 输出文件为 CommonJS格式 */
    format: 'es',
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    ts({
      tsconfig: 'tsconfig.json',
    }),
    json(),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
  ],
});
