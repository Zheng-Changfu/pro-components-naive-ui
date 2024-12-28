import type { PropType } from 'vue'
import type { ProLayoutType } from './types'
import { proLogoProps } from './components/logo'

export const proLayoutProps = {
  /**
   * logo 相关配置
   */
  ...proLogoProps,
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
