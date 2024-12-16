import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import mergeConfig from 'deepmerge'
import baseConfig from './rollup.base.config'

// esm 的开发和生产环境配置
function esmConfig(file, isProd) {
  return {
    output: {
      file,
      format: 'esm',
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
  mergeConfig(baseConfig, esmConfig('dist/index.mjs', false)), // 开发环境 esm
  mergeConfig(baseConfig, esmConfig('dist/index.prod.mjs', true)), // 生产环境 esm
]
