import type { ExtractPublicPropTypes, PropType } from 'vue'

export const proLogoProps = {
  /**
   * logo 配置，需要是一个图片地址，如果需要自定义，可以使用 logo 插槽
   */
  logo: String,
  /**
   * 点击 logo 触发的事件
   */
  onLogoClick: Function as PropType<(e: MouseEvent) => void>,
  /**
   * logo 图片右边的标题，垂直布局折叠时或者移动端模式下隐藏
   */
  title: String,
} as const

export type ProLogoProps = ExtractPublicPropTypes<typeof proLogoProps>
