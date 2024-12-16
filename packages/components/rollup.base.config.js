import path from 'node:path'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import e from 'rollup-plugin-esbuild'

const esbuild = e.default

const extensions = ['.mjs', '.js', '.json', '.ts']

// 公共配置
export default {
  input: 'src/index.ts',
  external: [
    'vue',
    'naive-ui',
  ],
  plugins: [
    json(),
    resolve({
      extensions,
    }),
    esbuild({
      tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
      target: 'esnext',
      sourceMap: true,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.5%, last 2 versions, not dead', // 支持最新两个版本的现代浏览器
          },
        ],
      ],
    }),
    commonjs(),
  ],
}
