import type { PropType } from 'vue'
import type { ProLayoutType } from './types'

export const proLayoutProps = {
  /**
   * logo 配置，需要是一个图片地址，如果需要自定义，可以使用 logo 插槽
   */
  logo: String,
  /**
   * 是否支持移动端布局
   */
  supportMobile: {
    type: Boolean,
    default: true,
  },
  /**
   * 布局类型
   * @default 'sidebar'
   */
  layoutType: String as PropType<ProLayoutType>,
} as const
