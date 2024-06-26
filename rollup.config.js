/** @format */

import { defineConfig } from 'rollup';
import ts from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default defineConfig({
  input: ['src/cli.ts', 'src/index.ts'],
  output: {
    dir: './dist',
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
