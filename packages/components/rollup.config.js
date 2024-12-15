import path from 'node:path'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mergeConfig from 'deepmerge'
import { dts } from 'rollup-plugin-dts'
import e from 'rollup-plugin-esbuild'

const esbuild = e.default

const extensions = ['.mjs', '.js', '.json', '.ts']

// 公共配置
const baseConfig = {
  input: 'src/index.ts',
  external: ['vue', 'naive-ui'],
  plugins: [
    json(),
    resolve({ extensions }),
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
    vueJsx(),
  ],
}

// es 和 lib 的配置
function esAndLibConfig(dir, format) {
  return {
    output: {
      dir,
      format,
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, 'src'),
      entryFileNames: '[name].js',
      exports: format === 'cjs' ? 'named' : undefined,
    },
    plugins: [
      replace({
        __DEV__: 'process.env.NODE_ENV !== "production"',
        preventAssignment: true,
      }),
    ],
  }
}

// umd 和 esm 的开发和生产环境配置
function umdEsmConfig(file, format, isProd) {
  return {
    output: {
      file,
      format,
      name: format === 'umd' ? 'proNaive' : undefined,
      exports: format === 'umd' ? 'named' : undefined,
      globals: {
        'vue': 'Vue',
        'naive-ui': 'naive',
      },
    },
    plugins: [
      replace({
        values: {
          '__DEV__': JSON.stringify(!isProd),
          'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        },
        preventAssignment: true,
      }),
      isProd && terser(),
    ].filter(Boolean),
  }
}

// dts 文件配置
const dtsConfig = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'es',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].d.ts',
    },
    {
      dir: 'lib',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].d.ts',
    },
  ],
  plugins: [
    json(),
    dts({
      tsconfig: path.resolve(__dirname, '../../tsconfig.json'),
      compilerOptions: {
        preserveSymlinks: false,
      },
    }),
  ],
}

export default [
  mergeConfig(baseConfig, esAndLibConfig('es', 'esm')), // es 目录
  // mergeConfig(baseConfig, esAndLibConfig('lib', 'cjs')), // lib 目录

  // mergeConfig(baseConfig, umdEsmConfig('dist/index.js', 'umd', false)), // 开发环境 umd
  // mergeConfig(baseConfig, umdEsmConfig('dist/index.prod.js', 'umd', true)), // 生产环境 umd

  // mergeConfig(baseConfig, umdEsmConfig('dist/index.mjs', 'esm', false)), // 开发环境 esm
  // mergeConfig(baseConfig, umdEsmConfig('dist/index.prod.mjs', 'esm', true)), // 生产环境 esm

  // dtsConfig, // .d.ts 文件
]
