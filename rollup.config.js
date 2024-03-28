/** @format */

import { defineConfig } from 'rollup';
import ts from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import polyfillNode from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
export default defineConfig({
  input: 'src/cli.ts',
  output: {
    file: 'dist/cli.cjs',
    format: 'cjs',
  },
  plugins: [ts(), json(), nodeResolve(), polyfillNode()],
});
