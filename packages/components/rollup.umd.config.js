import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import mergeConfig from 'deepmerge'
import baseConfig from './rollup.base.config'

// umd 的开发和生产环境配置
function umdConfig(file, isProd) {
  return {
    output: {
      file,
      format: 'umd',
      name: 'proNaive',
      exports: 'named',
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

export default [
  mergeConfig(baseConfig, umdConfig('dist/index.js', false)), // 开发环境 umd
  mergeConfig(baseConfig, umdConfig('dist/index.prod.js', true)), // 生产环境 umd
]
