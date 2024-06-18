import type { SpinProps } from 'naive-ui'
import type { PropType } from 'vue'
import type { UseRequestOptions } from 'pro-components-hooks'

export const asyncDataSourceProps = {
  /**
   * loading 组件属性
   */
  spinProps: {
    type: Object as PropType<SpinProps>,
    default: () => ({}),
  },
  /**
   * 请求配置
   */
  fetchConfig: {
    type: Object as PropType<UseRequestOptions<any, any>>,
  },
} as const
